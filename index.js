$(function () {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyDTIIuq2IGX0DiC0vlXRXhMIlkqR9SiaMM",
        authDomain: "kojs-5d4b5.firebaseapp.com",
        databaseURL: "https://kojs-5d4b5.firebaseio.com",
        projectId: "kojs-5d4b5",
        storageBucket: "",
        messagingSenderId: "330502810409"
    };
    firebase.initializeApp(config);
    const db = firebase.database();
    const ref = db.ref('TODO');

    /* add to firebase */
    const addToFirebase = text => {
        const key = ref.push().key;
        const todo = {
            created: firebase.database.ServerValue.TIMESTAMP,
            isDone: false,
            text,
            key
        };
        ref.child(key).set(todo);
    };

    /* remove from firebase */
    const removeFromFirebase = key => {
        ref.child(key).remove();
    }

    /* update firebase */
    const updateFirebase = (key, todo) => {
        const testObj = {
            created: 1527041430280,
            isDone: true,
            text: 'updated',
            key: '-LD9kl88OJM8MBAHyav4'
        }
        ref.child(key).update(todo);
    }


    function AppViewModel() {
        const self = this;

        self.noteToAdd = ko.observable('');
        self.filterState = ko.observable('SHOW_ALL');
        self.isLoading = ko.observable(false);

        self.notes = ko.observableArray([]);

        ref.on('value', async snapshot => {
            self.isLoading(true);
            self.notes([]);
            await snapshot.forEach(c => {
                const d = c.val();
                d.created = new Date(d.created);
                self.notes.push(d);
            });
            self.isLoading(false);
        });

        self.filtered = ko.computed(() => {
            const todoFilters = self.notes();
            switch (self.filterState()) {
                case 'SHOW_ALL':
                    return todoFilters;
                    break;
                case 'DOING':
                    return ko.utils.arrayFilter(todoFilters, e => e.isDone === false);
                    break;
                case 'DONE':
                    return ko.utils.arrayFilter(todoFilters, e => e.isDone === true);
                    break;
                default:
                    return todoFilters;
                    break;
            }
        });

        self.add = () => {
            const t = self.noteToAdd().trim();
            if (t) {
                addToFirebase(t);
                self.noteToAdd('');
            }
        }

        self.toggle = todo => {
            const todoToUpdate = {
                ...todo,
                isDone: !todo.isDone
            };
            updateFirebase(todo.key, todoToUpdate);
        }

        self.remove = todo => {
            removeFromFirebase(todo.key);
        }

        self.getTodo = todo => {
            console.log(todo);
            
        }

        self.todoFilter = param => {
            self.filterState(param);
        }
    }

    ko.bindingHandlers.enterKey = {
        init: (element, valueAccessor, allBindings, viewModel) => {
            var callback = valueAccessor();
            $(element).keypress(event => {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    callback.call(viewModel);
                    return false;
                }
                return true;
            });
        }
    };
    ko.applyBindings(new AppViewModel());
})