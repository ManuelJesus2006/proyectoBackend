import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacteristicsDto {
  // --- Processors / RAM ---
  @ApiProperty({ 
    example: '3.5 GHz', 
    description: 'Base clock speed of the processor', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The speed must be string and contain the unit (Ghz or Mhz)'
  })
  speed?: string;

  @ApiProperty({ 
    example: '5.1 GHz', 
    description: 'Max turbo frequency', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The max speed must be string and contain the unit (Ghz or Mhz)'
  })
  max_speed?: string;

  @ApiProperty({ 
    example: '1.35 V', 
    description: 'Operating voltage', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The voltage must be string and contain the unit (V or W)'
  })
  voltage?: string;

  // --- Graphics Cards (GPU) ---
  @ApiProperty({ 
    example: '16 GB GDDR6X', 
    description: 'VRAM size and type', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The memory must be string and contain the unit (GB) and type (GDDR6...)'
  })
  memory?: string;

  @ApiProperty({ 
    example: '2520 MHz', 
    description: 'GPU Boost clock speed', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The boost clock must be string and contain the unit (Ghz or Mhz)'
  })
  boost_clock?: string;

  @ApiProperty({ 
    example: '450 W', 
    description: 'Thermal Design Power (TDP)', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The TDP must be string and contain the unit (W)'
  })
  tdp?: string;

  // --- Motherboards ---
  @ApiProperty({ 
    example: 'LGA1700', 
    description: 'CPU Socket type', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'You must put the exact socket (LGA1700, AM4...)'
  })
  socket?: string;

  @ApiProperty({ 
    example: 'Z790', 
    description: 'Motherboard chipset', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'You must put the exact chipset (Z690, B550...)'
  })
  chipset?: string;

  @ApiProperty({ 
    example: 'ATX', 
    description: 'Form factor', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'You must put the form factor (ATX, Micro-ATX...)'
  })
  form_factor?: string;

  // --- RAM ---
  @ApiProperty({ 
    example: 'DDR5', 
    description: 'Memory technology type', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The RAM type must be specified (DDR4, DDR5...)'
  })
  type?: string;

  // --- Storage ---
  @ApiProperty({ 
    example: 'PCIe 4.0 NVMe', 
    description: 'Connection interface', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'The interface type must be specified (NVMe, SATA, PCIe...)'
  })
  interface?: string;

  @ApiProperty({ 
    example: '7000 MB/s', 
    description: 'Sequential read speed', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Read speed must include the unit (MB/s or GB/s)'
  })
  speed_read?: string;

  @ApiProperty({ 
    example: '5000 MB/s', 
    description: 'Sequential write speed', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Write speed must include the unit (MB/s or GB/s)'
  })
  speed_write?: string;

  @ApiProperty({ 
    example: '7200 RPM', 
    description: 'Revolutions per minute (HDD)', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'RPM must be a string (e.g., "7200 RPM")'
  })
  rpm?: string;

  @ApiProperty({ 
    example: '64 MB', 
    description: 'Cache memory size', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Cache size must include the unit (MB)'
  })
  cache?: string;

  // --- Cooling ---
  @ApiProperty({ 
    example: '3x 120mm ARGB', 
    description: 'Included fans configuration', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Fans configuration must be a string (e.g., "2x 120mm")'
  })
  fans?: string;

  @ApiProperty({ 
    example: '120 mm', 
    description: 'Size of the individual fan', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Fan size must include the unit (mm)'
  })
  fan?: string;

  @ApiProperty({ 
    example: '25 dB', 
    description: 'Noise level', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Noise level must include the unit (dB)'
  })
  noise?: string;

  @ApiProperty({ 
    example: '155 mm', 
    description: 'Heatsink height', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Height must include the unit (mm)'
  })
  height?: string;

  // --- Power Supply (PSU) ---
  @ApiProperty({ 
    example: '750 W', 
    description: 'Power output capacity', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Wattage must include the unit (W)'
  })
  wattage?: string;

  @ApiProperty({ 
    example: '80+ Gold', 
    description: 'Efficiency certification', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Efficiency rating must be specified (80+ Gold, Platinum...)'
  })
  efficiency?: string;

  @ApiProperty({ 
    example: 'Full Modular', 
    description: 'Cabling modularity type', 
    required: false 
  })
  @IsOptional()
  @IsString({
    message: 'Modular type must be specified (Full, Semi, Non-modular)'
  })
  modular?: string;
}