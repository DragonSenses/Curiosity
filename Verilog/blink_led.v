module blink_led (
    input        clk,     // Clock input
    output reg   led      // LED output (active high)
);

    // 24-bit counter for timing
    reg [23:0] counter;

    always @(posedge clk) begin
        // Increment counter on each clock cycle
        counter <= counter + 1;

        // Toggle LED every 5 million clock cycles
        if (counter == 24'd5_000_000) begin
            led     <= ~led;     // Toggle LED state
            counter <= 24'd0;    // Reset counter
        end
    end

endmodule