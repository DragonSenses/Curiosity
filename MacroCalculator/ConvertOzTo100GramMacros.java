public class ConvertOzTo100GramMacros {

  public static String convertOzTo100GramMacros(
      String foodName,
      double weightOz,
      double calories,
      double fat,
      double carbs,
      double fiber,
      double sugar,
      double protein) {

    final double ouncesToGrams = 28.3495231;

    if (weightOz <= 0) {
      throw new IllegalArgumentException("Weight in ounces must be greater than zero.");
    }

    // Convert weight in ounces to grams
    double weightGrams = weightOz * ouncesToGrams;

    // Convert each macro to per 100 grams
    double caloriesPer100g = (calories / weightGrams) * 100;
    double fatPer100g = (fat / weightGrams) * 100;
    double carbsPer100g = (carbs / weightGrams) * 100;
    double fiberPer100g = (fiber / weightGrams) * 100;
    double sugarPer100g = (sugar / weightGrams) * 100;
    double proteinPer100g = (protein / weightGrams) * 100;

    // Create CSV format string
    return String.format("%s,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f",
        foodName, caloriesPer100g, fatPer100g, carbsPer100g, fiberPer100g, sugarPer100g, proteinPer100g);
  }

  // Example usage
  public static void main(String[] args) {
    try {
      // String csvData = convertOzTo100GramMacros("Chicken Rotisserie", 3, 140, 7.0, 0.5, 0.0, 0.0, 19.0);
      // String csvData = convertOzTo100GramMacros("Chicken Rotisserie Skin", 1, 115, 10.6, 0, 0, 0, 5.0);
      String csvData = convertOzTo100GramMacros("Chicken Rotisserie Skin", 1, 115, 10.6, 0, 0, 0, 5.0);
      System.out.println(csvData);
    } catch (IllegalArgumentException e) {
      System.err.println(e.getMessage());
    }
  }
}
