module uart_tx(
    input clk,
    input start,
    input [7:0] data,
    output reg tx
);
    reg [3:0] bit_index;   // Tracks which bit is being sent
    reg [7:0] tx_buffer;   // Holds the byte to transmit

    always @(posedge clk) begin
        if (start) begin
            tx_buffer <= data; // Load data
            bit_index <= 0; // Start sending
            tx <= 0; // Start bit
        end else if (bit_index < 8) begin
            tx <= tx_buffer[bit_index]; // Send data bits
            bit_index <= bit_index + 1;
        end else begin
            tx <= 1; // Stop bit
        end
    end
endmodule