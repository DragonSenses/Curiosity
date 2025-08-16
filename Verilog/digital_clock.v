module digital_clock(
  input clk,
  input reset,
  output reg [5:0] seconds,
  output reg [5:0] minutes,
  output reg [5:0] hours
);
