module binary_counter_4bit (
    input wire clk,           // Clock signal
    input wire reset,         // Asynchronous reset
    output reg [3:0] count    // 4-bit binary count output
);

    // On rising edge of clk or reset, update count
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            count <= 4'b0000; // Reset count to zero
        end else begin
            count <= count + 1'b1; // Increment count by 1
        end
    end

endmodule