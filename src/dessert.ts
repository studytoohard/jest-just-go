export default class dessert {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    enjoy() {
        return "Enjoy the " + this.name;
    }
}