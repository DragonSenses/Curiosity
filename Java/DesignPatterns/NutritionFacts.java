package Java.DesignPatterns;

/**
 * Consider a Builder when faced with many constructor parameters.
 * 
 * Builder Pattern is designed to create objects using a nested public static
 * class that has the same data fields as the outer class. 
 */
public class NutritionFacts {
    private final int servingSize;  // Required
    private final int servings;     // Required
    private final int calories;     // (per serving) optional
    private final int fat;          // (g/serving) optional
    private final int carbohydrate; // (g/serving) optional
    private final int protein;      // (g/serving) optional

    public static class Builder {
        // Required parameters
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values
        private int calories = 0;
        private int fat = 0;
        private int carbohydrate = 0;
        private int protein = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val){
            calories = val;   return this; 
        }
        public Builder fat(int val){
            fat = val;    return this; 
        }
        public Builder carbohydrate(int val){
            carbohydrate = val; return this; 
        }
        public Builder protein(int val){
            protein = val;     return this; 
        }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }

    }

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
        protein = builder.protein;
        carbohydrate = builder.carbohydrate;
    }

    public int getServingSize(){
        return servingSize;
    }

    public int getServings(){
        return servings;
    }

    public int getCalories(){
        return calories;
    }

    public int getFat(){
        return fat;
    }

    public int getCarbohydrate(){
        return carbohydrate;
    }

    public int getProtein(){
        return protein;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder("\nNutrition Facts\n");
        sb.append("[Calories| " + calories + "]\n");
        sb.append("[Fat     | " + fat + "]\n");
        sb.append("[Carbs   | " + carbohydrate + "]\n");
        sb.append("[Protein | " + protein + "]\n");
        return sb.toString();
    }

    public static void main(String[] args){
        NutritionFacts proteinPowder = new NutritionFacts.Builder(120,1)
            .calories(120).carbohydrate(3).protein(24).build();

        System.out.println("Protein Powder" + proteinPowder.toString());
    }
}
