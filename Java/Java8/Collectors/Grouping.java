package Java.Java8.Collectors;

// Use Dish.java file from same package
import static Java.Java8.Collectors.Dish.menu; 
import static Java.Java8.Collectors.Dish.dishTags;

// Import Data Structures
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

// Import Stream.Collector factory methods
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.filtering;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.flatMapping;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.reducing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.summingInt;
import static java.util.stream.Collectors.toCollection;

/**
 * Grouping is a common database operation where items in a set are grouped
 * based on one or more properties. Grouping is powerful because it composes
 * effectively
 * 
 * For Instance, we can group dishes based on a Single Criterion:
 * 1. Group the dishes in the menu according to their type 
 * 2. Classify dishes based on caloric levels
 * 3. Manipulate elements in each resulting group, such as filtering only
 * caloric dishes, groupingBy(Function,Collector.filtering)
 * 4. Manipulate elements in a group by transforming them through a mapping
 * function, groupingBy(Function,Collector.mapping())
 * 5. Use flatmapping Collector with groupingBy() to perform a flatMap transformation
 * 
 * Or Group dishes based on more than one Criterion at the same time 
 * (Multi-Level Grouping):
 * 
 * 6. Group by both Dish.Type and CaloricLevel, is a Multilevel grouping
 *  where Collectors.groupingBy() can be used to perform a two-level grouping,
 *  by passing a second inner groupingBy() to the outer groupingBy(). 
 * 
 * 7. Pass any type of Collector as 2nd argument to groupingBy(), for instance
 * to Count the Number of Dishes in the menu for each Type 
 * 
 * 8. Find Highest Calorie Dish in the menu, but now classified by Type of Dish
 * (Wrapped around Optional)
 * 
 * 9. Find Highest Calorie Dish in each subgroup in the menu, without Optionals
 * by adapting Collector result to a different type
 * 
 * Other Examples of Collectors used in Conjunction with groupingBy():
 * 
 * 10. Reuse the collector to sum the calories of all dishes, and apply it to
 * each group of dishes
 * 
 * 11. Use mapping collector to adapt a collector accepting elements of a 
 * given type to one working on objects of a different type, by applying
 * a mapping function to each input element before accumulating them. Example
 * is finding the CaloricLevels that are available in the menu for each type
 * of Dish.
 * 
 * 12. Improve the result of mapping collector passed in to groupingBy() by
 * having more control of the output Set by using toCollection().
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.groupingBy() - a factory method that takes in a Function, and
 * returns a Map having as map key the value returned by classification 
 * function and corresponding map value a list of all items in the stream
 * that have thhat classified value. 
 * (Ex. Menu-Classification: {Key = Dish.Type, Value = List of Dishes of that Type})
 *  - Note: Collectors.groupingBy(f), where f is classification function, is in
 * reality shorthand for groupingBy(f,toList())
 * 
 * -Collectors.groupingBy(Function, Collector) is an overloaded method 
 * variant that accepts a classfication function and a Collector as a 2nd argument
 *      -groupingBy(Function,Collector.filtering)
 *      -groupingBy(Function,Collector.mapping())
 *      -groupingBy(Function,Collector.flatMapping())
 *      -groupingBy(Function,groupingBy(Function,Collector))
 *      -groupingBy(Function,Collector.counting())
 * 
 * -Collectors.filtering() - Results in a Collector with the filtered elements
 * using a filtering predicate
 * 
 * -Collectors.collectingAndThen() - takes two arguments, the collector to be
 * adapted and a transformation function, and returns another collector. This
 * method can adapt the collector results of one to a different type
 */
public class Grouping {
    /**
     * 1. We pass in a classification Function (a method reference) which 
     * extracts the Dish.Type for each Dish in the Stream. This returns a
     * map whose keys are Dish.Type and values are List of all dishes of
     * that Type
     */
    private static Map<Dish.Type, List<Dish>> groupDishesByType() {
        return menu.stream().collect(groupingBy(Dish::getType));
    }

    // Create a set of enumerated values that will mark a dish as Diet, Normal,
    // or Fat based on its number of Calories
    public enum CaloricLevel{ DIET, NORMAL, FAT }

    /**
     * 2. Classify dishes with something more complex than a simple property
     * accessor. Here we classify dishes based on CaloricLevel, where
     * -Diet = 400 Calories or Fewer
     * -Normal = 400-700 Calories
     * -Fat = 700 Calories or more
     * @return a Map with CaloricLevel as Key and List of all dishes as values
     */
    private static Map<CaloricLevel, List<Dish>> groupDishesByCaloricLevel() {
        return menu.stream().collect(
            groupingBy(dish -> {    // Classification Function with Lambda Expression
              if (dish.getCalories() <= 400) {
                return CaloricLevel.DIET;
              }
              else if (dish.getCalories() <= 700) {
                return CaloricLevel.NORMAL;
              }
              else {
                return CaloricLevel.FAT;
              }
            })
        );
    }

    /**
     * 3. Manipulate Elements in a Resulting Group, filtering out by Calories
     * Collectors.groupingBy(Function, Collector.Filtering)
     * 
     * One solution applies filter() to the stream itself, but the drawback is 
     * that if there is no Dish.Type that satisfies the predicate the key
     * will disappear from the mapping. For instance, there is no Dish.Type FISH
     * that is greater than 500 calories. 
     * 
     * Instead, to keep the entry for FISH type and map to an empty list, use
     * a Collector made from filtering() as a 2nd argument to overloaded method
     * of groupingBy(). 
     * @return a Map of Caloric Dishes greather than 500 calroies, grouped by Type
     */
    private static Map<Dish.Type, List<Dish>> groupCaloricDishesByType() {
        //return menu.stream().filter(dish -> dish.getCalories() > 500).collect(groupingBy(Dish::getType));
        return menu.stream().collect(
            groupingBy(Dish::getType,
                filtering(dish -> dish.getCalories() > 500, toList())));
    }

    /**
     * 4. Manipulate Elements in a Group, transforming them through a mapping function 
     * Collectors.groupingBy(Function, Collector.Mapping)
     * 
     * Mapping Collector which accepts a mapping function and another Collector
     * used to gather the elements resulting from the application of that 
     * function to each of them. 
     * 
     * Here we convert each Dish in the groups into their respective names.
     * 
     * Note the difference between 1. and 4. is that this is a List<String> rather than
     * a List<Dish> 
     * @return Map with keys Dish.Type, and values as List of Dish names associated to key
     */
    private static Map<Dish.Type, List<String>> groupDishNamesByType() {
        return menu.stream().collect(
            groupingBy(Dish::getType,
                mapping(Dish::getName, toList())));
    }

    /**
     * 5. Use flatmapping Collector with groupingBy() to perform a flatMap transformation
     * 
     * Here we have a Map<String, List<String>> dishTags = new HashMap<>();
     * 
     * Example Entries in dishTags are:
     * {pork, {greasy, salty}}
     * {french fries, {greasy,fried}}
     * {rice, {light,natural}}
     * 
     * First, extract these tags for each group of type of dishes, using the
     * flatMapping Collector
     *  - For each Dish we obtain a List of Tags, so we need to perform a flatMap
     * in order to flatten the resulting two-level list into a single one. 
     *  - Collect the result of flatMapping() operations executed in each group
     * into a Set (instead of List) to avoid repetitions of same tags associated
     * to more than one Dish in the same type
     * @return Map with Keys Dish.Type and Value as a Set<String> that represent DishTags
     */
    private static Map<Dish.Type, Set<String>> groupDishTagsByType() {
        return menu.stream().collect(
            groupingBy(Dish::getType,
                flatMapping(dish -> dishTags.get(dish.getName()).stream(), toSet())));
    }

    /**
     * 6. Multilevel grouping where Collectors.groupingBy() can be used to
     * perform a two-level grouping, by passing a second inner groupingBy()
     * to the outer groupingBy().
     * 
     * Group Dishes by both Dish.Type and CaloricLevel
     * @return a Mapping that groups every Dish.Type to another Map by
     * CaloricLevel and a list of its associated Dishes
     */
    private static Map<Dish.Type, Map<CaloricLevel, List<Dish>>> groupDishedByTypeAndCaloricLevel() {
        return menu.stream().collect(
            groupingBy(Dish::getType,   // First-Level Classification Function
                groupingBy((Dish dish) -> { // Second-Level Classfication Function
                  if (dish.getCalories() <= 400) {
                    return CaloricLevel.DIET;
                  }
                  else if (dish.getCalories() <= 700) {
                    return CaloricLevel.NORMAL;
                  }
                  else {
                    return CaloricLevel.FAT;
                  }
                })
            )
        );
    }

    /**
     * 7. Count the Number of Dishes in the menu for each Dish Type
     * By passing in counting Collector as 2nd argument to groupingBy() collector
     * 
     * @return a Map, keys as Dish Type and Values as the number of dishes of that type
     */
    private static Map<Dish.Type, Long> countDishesInGroups() {
        return menu.stream().collect(groupingBy(Dish::getType, counting()));
    }

    /**
     * 8. Find Highest Calorie Dish in the menu, classified by Dish Type,
     * result is a Map with keys as available types of Dishes and values 
     * the Optional<Dish>, wrapping the corresponding highest-calorie Dish
     * for a given type.
     * 
     * @return Map with keys as Dish Types and Values as Optional<Dish> with
     * the highest calories
     */
    private static Map<Dish.Type, Optional<Dish>> mostCaloricDishesByType() {
        return menu.stream().collect(
            groupingBy(Dish::getType,
                reducing((Dish d1, Dish d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2)));
    }

    /**
     * Note that the values in the Map above are Optionals because the resulting
     * type of collector generated by maxBy() factory method, but in reality if there
     * is no Dish in the menu for a given type, that type won't have an Optional.empty()
     * as value, it won't be present at all as a key in the Map
     * 
     * groupingBy() collector lazily adds a new key in the grouping Map only 
     * the first time it finds an element in the stream, producing that key when
     * applying on it the grouping criteria being used
     * 
     * In this case, the Optional wrapper isn't useful, because it's not modeling
     * a value that could be possibly absent but is there incidentally, only 
     * because this is the type returned by the reducing collector
     */

    /**
     * 9. Find Highest Calorie Dish in each subgroup in the menu, without Optionals
     * by adapting Collector result to a different type.
     * 
     * collectingAndThen() method takes a collector (one created by maxBy()) and
     * the transformation function (Optional::get) which extracts the value 
     * contained in the Optional returned
     * 
     * This is safe because the reducing() collector will never return an 
     * Optional.empty() 
     */
    private static Map<Dish.Type, Dish> mostCaloricDishesByTypeWithoutOptionals() {
        return menu.stream().collect(
            groupingBy(Dish::getType,
                collectingAndThen(  // Method that Adapts the Collector Result to Another Type
                    // maxBy(comparingInt(Dish::getCalories)), // Collector to Adapt
                    reducing((d1, d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2),
                    Optional::get))); // Transformation Function
    }

    /**
     * 10. Reuse the collector to sum the calories of all dishes, and apply it to
     * each group of dishes
     * @return Total calories of each type subgroup within the menu
     */
    private static Map<Dish.Type, Integer> sumCaloriesByType() {
        return menu.stream().collect(groupingBy(Dish::getType,
            summingInt(Dish::getCalories)));
    }


    /**
     * 11. Find the CaloricLevels that are available in the menu for each type
     * of Dish.
     * 
     * Use mapping collector to adapt a collector accepting elements of a 
     * given type to one working on objects of a different type, by applying
     * a mapping function to each input element before accumulating them.
     * 
     * (1) - Transformation function passed to mapping method maps a Dish into
     * its CaloricLevel
     * (2) - Resulting Stream of CaloricLevels is then passed to toSet() collector,
     * to keep only distinct values
     * (3) - Mapping Collector will then be used to collect the elements in each
     * substream generated by grouping function, to obtain the resulting Map
     * 
     * @return Group dishes in the menu by type after mapping dishes into Caloric Levels
     */
    private static Map<Dish.Type, Set<CaloricLevel>> caloricLevelsByType() {
        return menu.stream().collect(
        groupingBy(Dish::getType, mapping( dish -> {    // (1)
                    if (dish.getCalories() <= 400) {
                        return CaloricLevel.DIET;
                    }
                    else if (dish.getCalories() <= 700) {
                        return CaloricLevel.NORMAL;
                    }
                    else {
                        return CaloricLevel.FAT;
                    }
                },
                toSet() // (2)
            )) // (3)
        );
    }

    /**
     * 12. Improve the result of mapping collector passed in to groupingBy() by
     * having more control of the output
     * 
     * Note: in (11) there are no guarantees about what type of Set is returned,
     * so by using toCollection() we can have more control over the output. Can
     * ask for HashSet by passing a constructor reference to it.
     * 
     * Only step we changed from 1,2,3 is the (2) step in which instead of 
     * passing Stream of CaloricLevels to toSet() collector, we pass to a
     * toCollection()
     */
    private static Map<Dish.Type, Set<CaloricLevel>> caloricLevelsByType2() {
        return menu.stream().collect(
        groupingBy(Dish::getType, mapping( dish -> {    // (1)
                    if (dish.getCalories() <= 400) {
                        return CaloricLevel.DIET;
                    }
                    else if (dish.getCalories() <= 700) {
                        return CaloricLevel.NORMAL;
                    }
                    else {
                        return CaloricLevel.FAT;
                    }
                }, 
                // (2) Instead of toSet() we use toCollection() and pass a Constructor Reference
                toCollection(HashSet::new)
            )) // (3)
        );
    }

    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Grouping Dishes in the Menu ========");
        System.out.println("[Dishes grouped by type]\n " + groupDishesByType());
        System.out.println("\n[Dishes grouped by caloric level]\n " + groupDishesByCaloricLevel());

        System.out.println("\n======== Filtering Collector ========");
        System.out.println("[Caloric dishes (>500 Cal) grouped by type]\n " + groupCaloricDishesByType());

        System.out.println("\n======== Mapping Collector ========");
        System.out.println("[Dish names grouped by type]\n " + groupDishNamesByType());

        System.out.println("\n======== flatMapping Collector ========");
        System.out.println("[Dish tags grouped by type]\n " + groupDishTagsByType());

        System.out.println("\n======= Multilevel Grouping ========");
        System.out.println("[Dishes grouped by type and caloric level]\n " + groupDishedByTypeAndCaloricLevel());

        System.out.println("\n[Count dishes in groups]\n " + countDishesInGroups());

        System.out.println("\n======= Grouping and Reduction ========");
        System.out.println("[Most caloric dishes by type]\n " + mostCaloricDishesByType());

        System.out.println("\n[Most caloric dishes by type (without Optionals)]\n "
             + mostCaloricDishesByTypeWithoutOptionals());

        System.out.println("\n================ Collectors used in Conjunction with groupingBy()================");
        System.out.println("======= Reuse Sum Collector and Group by Type ========");
        System.out.println("[Sum calories by type] " + sumCaloriesByType());

        System.out.println("\n======= Mapping and Grouping by Type ========");
        System.out.println("[Caloric levels by type]: " + caloricLevelsByType());

        System.out.println("\n======= Mapping and Grouping by Type using HashSet ========");
        System.out.println("[Caloric levels by type]: " + caloricLevelsByType2());
    }

    // Prints the available menu and respective calories
    public static void showMenu(){
        List<String> dishNames = menu.stream()
            .map(Dish::getName)
            .collect(toList());
        System.out.print("menu: ");
        System.out.println(dishNames);
        List<Integer> dishCalories = menu.stream()
            .map(Dish::getCalories)
            .collect(toList());
        System.out.print("Cals: ");
        System.out.println(dishCalories);    
    }
}
