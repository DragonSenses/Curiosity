/* Symbol Type */
/* By specification, only 2 primitive types may serve as object property keys:
  1) String Type 
  2) Symbol Type
  
  Otherwise, if one uses another type, such as number, it's autoconverted to 
  String. So that 
    - obj[1] is the same as obj["1"]
    - obj[true] is the same as obj["true"]
*/