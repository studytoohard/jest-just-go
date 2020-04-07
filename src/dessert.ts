export default class dessert {
    name: string;
    static comment: string[] = [];
    constructor(name: string) {
        this.name = name;
    }
    enjoy() {
        return "Enjoy the " + this.name;
    }
    static comments(message: string) {
        dessert.comment.push(message);
    }
}