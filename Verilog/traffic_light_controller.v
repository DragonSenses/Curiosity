module traffic_light_controller (
    input wire clk,           // Clock signal
    input wire reset,         // Asynchronous reset
    output reg [1:0] light    // Traffic light output: 00=Red, 01=Green, 10=Yellow
);

    // State encoding using local parameters
    localparam RED    = 2'b00;
    localparam GREEN  = 2'b01;
    localparam YELLOW = 2'b10;

    // Internal state register
    reg [1:0] current_state;

    // Sequential state transition logic
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            current_state <= RED; // Initialize to RED on reset
        end else begin
            case (current_state)
                RED:    current_state <= GREEN;
                GREEN:  current_state <= YELLOW;
                YELLOW: current_state <= RED;
                default: current_state <= RED; // Fallback for safety
            endcase
        end
    end

    // Output assignment (registered for timing stability)
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            light <= RED;
        end else begin
            light <= current_state;
        end
    end

endmodule