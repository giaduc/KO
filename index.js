$(function () {
    ko.components.register('first-component', {
        viewModel: function (data) {
            this.name = (data && data.name) || "none";
        },
        template: `<div data-bind="text: name"></div>`
    })

    function AppViewModel() {
        /* this.pages = ["page1", "page2", "page3"];
        this.age = ko.observable(39);
        this.name = ko.observable("Bert");
        this.helloEnabled = ko.observable();
        this.goodbyeEnabled = ko.observable();
        this.msg = ko.observable();
        this.name.subscribe(function (e) {
            console.log(e);

        });

        this.listData = ko.observableArray([{
                name: "Bungle",
                type: "Bear"
            },
            {
                name: "George",
                type: "Hippo"
            },
            {
                name: "Zippy",
                type: "Unknown"
            }
        ]);

        this.listData.subscribe(function (e) {
            console.log(e);
        });

        this.change = () => {
            this.age(40).name('aljfiwefadsl');
            this.listData.push({
                name: "Bungle",
                type: "Bear"
            })
        }

        this.hello = () => {
            this.helloEnabled('Hello!');
            this.goodbyeEnabled('');
        }
        this.goodbye = () => {
            this.goodbyeEnabled('Goodbye!');
            this.helloEnabled('');
        }
        this.submit = () => {
            $.ajax("jaljsfjdlfk", () => {
                console.log('submit');

            })
        }

        this.show = () => {
            this.msg(true);
        }
        this.hide = () => {
            this.msg(false);
        } */

    }
    ko.applyBindings(new AppViewModel());
})