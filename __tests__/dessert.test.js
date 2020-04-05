const dessert = require("../src/dessert");

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("enjoy the cake");
    })
})