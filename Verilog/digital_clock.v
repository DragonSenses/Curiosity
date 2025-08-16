module digital_clock(
  input clk,
  input reset,
  output reg [5:0] seconds,
  output reg [5:0] minutes,
  output reg [5:0] hours
);
  always @(posedge clk or posedge reset) begin
    if (reset) begin
      seconds <= 0;
      minutes <= 0;
      hours <= 0;
    end
  end
endmodule