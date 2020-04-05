const dessertFactoty = require("../src/dessertFactoty");

describe("test dessertFactoty feature", () => {
    test("produce all dessert", () => {
        const dessertType = ['Red bean burning', 'Tiramisu'];
        expect(dessertFactoty.produce(dessertType[0]).enjoy()).toBe("Enjoy the Red bean burning");
    })
})