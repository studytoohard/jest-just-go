import dessertFactoty from "../src/dessertFactoty";

describe("test dessertFactoty feature", () => {
    test("produce all dessert", () => {
        const dessertType = ['Red bean burning', 'Tiramisu'];
        expect(dessertFactoty.produce(dessertType[0]).enjoy()).toBe("Enjoy the Red bean burning");
        expect(dessertFactoty.produce(dessertType[1]).enjoy()).toBe("Enjoy the Tiramisu");
        expect(() => { dessertFactoty.produce('Luckin Coffee') }).toThrow("please choose a dessert type");
    })
})