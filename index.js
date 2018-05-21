$(function () {
    function AppViewModel() {
        const self = this;

        self.noteToAdd = ko.observable('');
        self.filterState = ko.observable('SHOW_ALL');

        self.notes = ko.observableArray([{
            dateTime: new Date(),
            text: 'Doing',
            isDone: false
        }, {
            dateTime: new Date(),
            text: 'Done',
            isDone: true
        }]);

        self.filtered = ko.computed(function () {
            const todoFilters = self.notes();
            switch (self.filterState()) {
                case 'SHOW_ALL':
                    console.log('SHOW_ALL');
                    return todoFilters;
                    break;
                case 'DOING':
                    console.log('DOING');
                    return ko.utils.arrayFilter(todoFilters, e => e.isDone === false);
                    break;
                case 'DONE':
                    console.log('DONE');
                    return ko.utils.arrayFilter(todoFilters, e => e.isDone === true);
                    break;
                default:
                    return todoFilters;
                    break;
            }
        })

        self.add = function () {
            const note = self.noteToAdd().trim();
            if (note) {
                self.notes.push({
                    dateTime: new Date(),
                    text: note,
                    isDone: false
                });
                self.noteToAdd('');
            }
        }

        self.toggle = function (todo) {
            for (const i of self.notes()) {
                if (i == todo) {
                    self.notes.replace(i, { ...i,
                        isDone: !i.isDone
                    });
                }
            }
        }

        self.remove = function (todo) {
            self.notes.remove(todo);
        }

        // return ko.utils.arrayFilter(self.notes(), e => e.isDone === false);
        self.todoFilter = function (param) {
            self.filterState(param);
        }

    }
    ko.applyBindings(new AppViewModel());
})