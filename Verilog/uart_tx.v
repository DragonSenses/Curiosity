module uart_tx(
    input clk,
    input start,
    input [7:0] data,
    output reg tx
);
    reg [3:0] bit_index;
    reg [7:0] buffer;

    always @(posedge clk) begin
        if (start) begin
            buffer <= data; // Load data
            bit_index <= 0; // Start sending
            tx <= 0; // Start bit
        end else if (bit_index < 8) begin
            tx <= buffer[bit_index]; // Send data bits
            bit_index <= bit_index + 1;
        end else begin
            tx <= 1; // Stop bit
        end
    end
endmodule