public class ConvertTo100GramMacros {

  public static String convertTo100GramMacros(
      String foodName,
      double weight,
      double calories,
      double fat,
      double carbs,
      double fiber,
      double sugar,
      double protein) {

    if (weight <= 0) {
      throw new IllegalArgumentException("Weight must be greater than zero.");
    }

    // Convert each macro to per 100 grams
    double caloriesPer100g = (calories / weight) * 100;
    double fatPer100g = (fat / weight) * 100;
    double carbsPer100g = (carbs / weight) * 100;
    double fiberPer100g = (fiber / weight) * 100;
    double sugarPer100g = (sugar / weight) * 100;
    double proteinPer100g = (protein / weight) * 100;

    // Create CSV format string
    return String.format("%s,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f",
        foodName, caloriesPer100g, fatPer100g, carbsPer100g, fiberPer100g, sugarPer100g, proteinPer100g);
  }

  // Example usage
  public static void main(String[] args) {
    try {
      // String csvData = convertTo100GramMacros("Broccoli", 85, 25, 0.0, 4, 2, 1, 3);
      // String csvData = convertTo100GramMacros("Spinach", 85, 20, 0.0, 3, 2, 0, 2);
      // String csvData = convertTo100GramMacros("Tillamook Medium Cheddar", 21, 90, 7, 1, 0, 0, 5);
      // String csvData = convertTo100GramMacros("Extra Virgin Olive Oil", 15, 120, 14.0, 0, 0, 0, 0);
      // String csvData = convertTo100GramMacros("Kirkland Low Fat Greek Yogurt", 170, 100, 0, 7, 0, 3, 18);
      // String csvData = convertTo100GramMacros("Kirkland Rolled Oats", 40, 150, 2.5, 27, 4, 0, 5);
      String csvData = convertTo100GramMacros("Mountain Maid Dry Milk", 23, 160, 9, 13, 0, 12, 8);
      System.out.println(csvData);
    } catch (IllegalArgumentException e) {
      System.err.println(e.getMessage());
    }
  }
}
