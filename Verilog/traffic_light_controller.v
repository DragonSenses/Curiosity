module traffic_light_controller (
    input clk,             // Clock signal
    input reset,           // Asynchronous reset
    output reg [1:0] light // Traffic light output: 00=Red, 01=Green, 10=Yellow
);
    reg [1:0] state;

    // State transition logic
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            state <= 2'b00; // Start with Red on reset
        end else begin
            case (state)
                2'b00: state <= 2'b01; // Red to Green
                2'b01: state <= 2'b10; // Green to Yellow
                2'b10: state <= 2'b00; // Yellow to Red
            endcase
        end
    end
    
    // Output logic (synthesis stability)
    always @(*) begin
        light = state;
    end
endmodule