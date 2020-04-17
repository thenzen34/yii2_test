$(function () {
    var ajax_busy = $('#ajax_busy');
    var notesApi = Vue.resource('/v1/notes{/id}');

    function getIndex(list, id) {
        for (var i = 0; i < list.length; i++ ) {
            if (list[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    Vue.component('node-form', {
        props: ['notes', 'noteArrt'],
        data: function () {
            return {
                id: '',
                
                //create_at: '',

                title: '',
                description: '',
                favorite: false
            }
        },
        watch: {
            noteArrt: function(newVal, oldVal) {
                this.id = newVal.id;
                this.title = newVal.title;
                this.description = newVal.description;
                this.favorite = newVal.favorite;
            }
        },
        template: '<div><span class="glyphicon glyphicon-plus" aria-hidden="true" @click="create"></span>' +
            '<div class="modal fade" tabindex="-1" role="dialog" id="modal_form">' +
            '    <div class="modal-dialog" role="document">' +
            '        <div class="modal-content">' +
            '            <div class="modal-header text-center">' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                    <span aria-hidden="true">&times;</span>' +
            '                </button>' +
            '                <h4 class="modal-title">Создание</h4>' +
            '            </div>' +
            '            <form method="post" action="#" enctype="multipart/form-data" class="form-horizontal">' +
            '                <div class="modal-body">' +
            '                    <input name="id" type="hidden"/>' +

            '                    <div class="form-group">' +
            '                        <label for="note_title" class="col-sm-2 control-label">Заголовок</label>' +
            '                        <div class="col-sm-10">' +
            '                            <input id="note_title" class="form-control" name="title" type="text" v-model="title"/>' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="form-group">' +
            '                        <label for="note_description" class="col-sm-2 control-label">Описание</label>' +
            '                        <div class="col-sm-10">' +
            '                        <textarea id="note_description" class="form-control" name="description" rows="5" cols="50" v-model="description">' +
            '                        </textarea>' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="form-group">' +
            '                        <label for="note_favorite" class="col-sm-2 control-label">Избранное</label>' +
            '                        <div class="col-sm-10">' +
            '                            <input id="note_favorite" class="form-control" name="favorite" type="checkbox" v-model="favorite"/>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="modal-footer">' +
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>' +

            '                    <button type="button" class="btn btn-primary" @click="save">Отправить</button>' +
            '                </div>' +

            '            </form>' +
            '        </div><!-- /.modal-content -->' +
            '    </div><!-- /.modal-dialog -->' +
            '</div><!-- /.modal -->' + '</div>',
        methods: {
            create: function() {
                $('#modal_form').modal();
            },
            save: function() {
                var note = {
                    title: this.title,
                    description: this.description,
                    favorite: this.favorite
                };

                if (this.id) {
                    notesApi.update({id: this.id}, note).then(result =>
                        result.json().then(data => {
                            var index = getIndex(this.notes, data.id);
                            this.notes.splice(index, 1, data);

                            this.id = '';
                            this.title = '';
                            this.description = '';
                            this.favorite = false;
                            $('#modal_form').modal('hide');
                        })
                    )
                } else {
                    notesApi.save({}, note).then(result =>
                        result.json().then(data => {
                            /* запрашиваем новую запись с заполнеными автополями */
                            notesApi.get({id:data.id}).then(result => {
                                result.json().then(new_note => {
                                    this.notes.push(new_note);
                                    
                                    this.title = '';
                                    this.description = '';
                                    this.favorite = false;
                                    $('#modal_form').modal('hide');
                                });
                            });
                        })
                    )
                }
            }
        }
    });

    Vue.component('note-row', {
        props: ['note', 'editMethod', 'notes'],
        template: '                <tr>' +
            '                    <td>{{ note.id }}</td>' +
            '                    <td>{{ note.create_at }}</td>' +
            '                    <td>{{ note.title }}</td>' +
            '                    <td>{{ note.description }}</td>' +
            '                    <td><span class="glyphicon glyphicon-star" aria-hidden="true" v-bind:class="{favorite: note.favorite}" @click="toogleFavorite"></span>' +
            '                    <span class="glyphicon glyphicon-pencil" aria-hidden="true" @click="edit"></span>' +
            '                    <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="del"></span></td>' +
            '                </tr>',
        methods: {
            edit: function() {
                this.editMethod(this.note);
            },
            del: function() {
                var result = confirm("удаляем заметку #" + this.note.id + "?");
                if (result) {
                    this.$root.showBusy();
                    notesApi.remove({id: this.note.id}).then(result => {
                        if (result.ok) {
                            this.notes.splice(this.notes.indexOf(this.note), 1);
                        }
                        this.$root.hideBusy();
                    })
                }
            },
            toogleFavorite:function () {
                this.$root.showBusy();
                this.note.favorite = !this.note.favorite;
                notesApi.update({id: this.note.id}, this.note).then(result =>
                    result.json().then(data => {
                        this.$root.hideBusy();
                    })
                )
            }
        }
    });
    
    Vue.component('notes-list', {
        props: ['notes'],
        data: function() {
            return {
                note: null,
                sort_field:'create_at',
                sort_type:'',
                localNotes: this.notes
            }
        },
        template: '<div>' +
            '            <node-form :notes="localNotes" :noteArrt="note"/>' +
            '            <table class="table table-striped">' +
            '                <thead>' +
            '                <tr>' +
            '                    <th>#</th>' +
            '                    <th @click="sort_by_dt">Дата создания</th>' +
            '                    <th>Название</th>' +
            '                    <th>Описание</th>' +
            '                    <th @click="sort_by_favorite">Избранное</th>' +
            '                </tr>' +
            '                </thead>' +
            '                <tbody>' +
            '<note-row v-for="note in localNotes" :key="note.id" :note="note" ' +
            ':editMethod="editMethod" :notes="localNotes" />' +
            '                </tbody>' +
            '            </table>'+ '</div>',
        created: function () {
            //ajax get items append
            this.load_data();
        },
        methods: {
            load_data: function() {
                this.$root.showBusy();
                var sort_by = this.sort_type + this.sort_field;
                notesApi.get({sort: sort_by}).then(result => {
                    this.localNotes = [];
                    result.json().then(data => {
                        data.forEach(note => this.localNotes.push(note));
                        this.$root.hideBusy();
                    })
                });
            },
            sort_by_dt: function() {
                if (this.sort_field !== 'create_at' || this.sort_type !== '') {
                    this.sort_type = ''
                } else {
                    this.sort_type = '-'
                }

                this.sort_field = 'create_at';
                this.load_data();
            },
            sort_by_favorite: function() {
                if (this.sort_field !== 'favorite' || this.sort_type !== '') {
                    this.sort_type = ''
                } else {
                    this.sort_type = '-'
                }
                this.sort_field = 'favorite';
                this.load_data();
            },
            editMethod: function(note) {
                $('#modal_form').modal();
                this.note = note;
            }
        }
    });

    document.app4 = new Vue({
        el: '#app',
        data: {
            notes:[]
        },
        template: '<div class="row">' +
            '        <div class="col-md-12">' +
            '<notes-list :notes="notes" />' +
            '        </div>' +
            '    </div>',
        methods: {
            hideBusy: function () {
                $(ajax_busy).hide();
                $('html').removeClass('ov-hidden');
                $(window).scrollTop($(ajax_busy).data('top'));
            },
            showBusy: function () {
                $(ajax_busy).show();
                $(ajax_busy).data('top', $(window).scrollTop());
                $('html').addClass('ov-hidden');
            }
        }
    })
});