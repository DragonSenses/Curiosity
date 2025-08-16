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
    end else begin
      if (seconds == 59) begin
        seconds <= 0;
        if (seconds == 59) begin
          seconds <= 0;
          if (minutes == 59) begin
            minutes <= 0;
            // hours logic to be added later
          end else begin
            minutes <= minutes + 1;
          end
        end
      end else begin
        seconds <= seconds + 1;
      end
    end
  end
endmodule