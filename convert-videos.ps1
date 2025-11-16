# Script for converting video files using ffmpeg
# Usage: .\convert-videos.ps1

$sourceDir = "src/assets/BirthdayPhotoAndVid"
$outputDir = "$sourceDir/converted"

# Create output directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Array of video files to convert
$videos = @(
    "2014-05-22_robot-build.mp4",
    "2011-12-10_sleigh-ride.mp4",
    "2018-06-30_star-performance.mp4"
)

foreach ($video in $videos) {
    $inputPath = Join-Path $sourceDir $video
    $outputName = $video -replace '\.mp4$', '-converted.mp4'
    $outputPath = Join-Path $outputDir $outputName
    
    if (Test-Path $inputPath) {
        Write-Host "Converting: $video" -ForegroundColor Green
        ffmpeg -i "`"$inputPath`"" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "`"$outputPath`""
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully converted: $outputName" -ForegroundColor Green
        } else {
            Write-Host "Error converting: $video" -ForegroundColor Red
        }
    } else {
        Write-Host "File not found: $inputPath" -ForegroundColor Yellow
    }
}

Write-Host "`nConversion completed!" -ForegroundColor Cyan

