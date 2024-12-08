function convertTo100GramMacros(
  foodName: string,
  weight: number,
  calories: number,
  fat: number,
  carbs: number,
  fiber: number,
  sugar: number,
  protein: number
): string {
  if (weight <= 0) {
      throw new Error("Weight must be greater than zero.");
  }

  // Convert each macro to per 100 grams
  const caloriesPer100g = (calories / weight) * 100;
  const fatPer100g = (fat / weight) * 100;
  const carbsPer100g = (carbs / weight) * 100;
  const fiberPer100g = (fiber / weight) * 100;
  const sugarPer100g = (sugar / weight) * 100;
  const proteinPer100g = (protein / weight) * 100;

  // Create CSV format string
  const csvOutput = `${foodName},${caloriesPer100g.toFixed(2)},${fatPer100g.toFixed(2)},${carbsPer100g.toFixed(2)},${fiberPer100g.toFixed(2)},${sugarPer100g.toFixed(2)},${proteinPer100g.toFixed(2)}`;

  return csvOutput;
}

// Example usage:
try {
  const csvData = convertTo100GramMacros("Pinto Beans", 150, 180, 1.2, 39, 10.5, 0.9, 13.5);
  console.log(csvData);
} catch (error) {
  console.error(error.message);
}


function convertOzTo100GramMacros(
  foodName: string,
  weightOz: number,
  calories: number,
  fat: number,
  carbs: number,
  fiber: number,
  sugar: number,
  protein: number
): string {
  const ouncesToGrams = 28.3495;

  if (weightOz <= 0) {
      throw new Error("Weight in ounces must be greater than zero.");
  }

  // Convert weight in ounces to grams
  const weightGrams = weightOz * ouncesToGrams;

  // Convert each macro to per 100 grams
  const caloriesPer100g = (calories / weightGrams) * 100;
  const fatPer100g = (fat / weightGrams) * 100;
  const carbsPer100g = (carbs / weightGrams) * 100;
  const fiberPer100g = (fiber / weightGrams) * 100;
  const sugarPer100g = (sugar / weightGrams) * 100;
  const proteinPer100g = (protein / weightGrams) * 100;

  // Create CSV format string without the header
  const csvOutput = `${foodName},${caloriesPer100g.toFixed(2)},${fatPer100g.toFixed(2)},${carbsPer100g.toFixed(2)},${fiberPer100g.toFixed(2)},${sugarPer100g.toFixed(2)},${proteinPer100g.toFixed(2)}`;

  return csvOutput;
}

// Example usage:
try {
  const csvData = convertOzTo100GramMacros("Pinto Beans", 5, 180, 1.2, 39, 10.5, 0.9, 13.5);
  console.log(csvData);
} catch (error) {
  console.error(error.message);
}
