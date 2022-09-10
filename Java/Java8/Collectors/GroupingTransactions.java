package Java.Java8.Collectors;

import static java.util.stream.Collectors.groupingBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Group a list of Transactions based on their currency. An introduction to 
 * collectors, which builds a summary of elements in the stream. The method
 * groupingBy() makes a Map whose keys are buckets and whose values are a list
 * of elements in those buckets. In this case, the buckets are currency, and
 * the list of elements are transactions. 
 */
public class GroupingTransactions {

  public static List<Transaction> transactions = Arrays.asList(
    new Transaction(Currency.EUR, 1500.0),
    new Transaction(Currency.USD, 2300.0),
    new Transaction(Currency.GBP, 9900.0),
    new Transaction(Currency.EUR, 1100.0),
    new Transaction(Currency.JPY, 7800.0),
    new Transaction(Currency.CHF, 6700.0),
    new Transaction(Currency.EUR, 5600.0),
    new Transaction(Currency.USD, 4500.0),
    new Transaction(Currency.CHF, 3400.0),
    new Transaction(Currency.GBP, 3200.0),
    new Transaction(Currency.USD, 4600.0),
    new Transaction(Currency.JPY, 5700.0),
    new Transaction(Currency.EUR, 6800.0)
  );

  public static void main(String... args) {
    groupImperatively();
    groupFunctionally();
  }

  /** Prior to Java 8 */
  private static void groupImperatively() {
    // 1. Creates the Map where grouped transactions will be accumulated
    Map<Currency, List<Transaction>> transactionsByCurrencies = new HashMap<>();

    // 2. Iterates the list of Transactions
    for (Transaction transaction : transactions) {
      Currency currency = transaction.getCurrency(); // 3. Extracts the Transaction's currency
      List<Transaction> transactionsForCurrency = transactionsByCurrencies.get(currency);

      // 4. If there is no entry in the grouping Map for this currency, creatte it
      if (transactionsForCurrency == null) { 
        transactionsForCurrency = new ArrayList<>();
        transactionsByCurrencies.put(currency, transactionsForCurrency);
      }

      // 5. Add the currently traversed Transaction to the List of Transactions with the same currency
      transactionsForCurrency.add(transaction);
    }

    System.out.println(transactionsByCurrencies); // Output the result
  }

  /**
   * Can achieve the same result above using a more general Collector parameter
   * to the collect() method on Stream
   */
  private static void groupFunctionally() {
    Map<Currency, List<Transaction>> transactionsByCurrencies = transactions.stream()
        .collect(groupingBy(Transaction::getCurrency));

    System.out.println(transactionsByCurrencies);
  }

  // Transaction class that contains two fields: currency and value
  public static class Transaction {

    private final Currency currency;
    private final double value;

    public Transaction(Currency currency, double value) {
      this.currency = currency;
      this.value = value;
    }

    public Currency getCurrency() {
      return currency;
    }

    public double getValue() {
      return value;
    }

    @Override
    public String toString() {
      return currency + " " + value;
    }

  }

  public enum Currency {
    EUR, USD, JPY, GBP, CHF
  }

}

