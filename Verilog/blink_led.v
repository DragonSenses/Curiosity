module blink_led #(
    parameter integer TOGGLE_INTERVAL = 24'd5_000_000  // Number of clock cycles between LED toggles
)(
    input        clk,     // Clock input
    output reg   led      // LED output (active high)
);

    // 24-bit counter for timing
    reg [23:0] counter;

    always @(posedge clk) begin
        // Increment counter on each clock cycle
        counter <= counter + 1;

        // Toggle LED when counter reaches the interval
        if (counter == TOGGLE_INTERVAL) begin
            led     <= ~led;           // Toggle LED state
            counter <= 24'd0;          // Reset counter
        end
    end

endmodule