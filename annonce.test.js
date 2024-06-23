// Importez la fonction à tester
import { calculateTotalPrice } from "./components/Annonce";

// Test
describe("calculateTotalPrice", () => {
  it("calculates total price correctly", () => {
    // Définissez des valeurs d'entrée pour le test
    const pricePerPerson = 10;
    const numPeople = 3;

    // Appelez la fonction à tester
    const totalPrice = calculateTotalPrice(pricePerPerson, numPeople);

    // Vérifiez que le résultat correspond à celui attendu
    expect(totalPrice).toBe(30); // Vérification 10 * 3 donne 30
  });
});

// installation yarn add -D jest
// pour passer les test yarn jest
