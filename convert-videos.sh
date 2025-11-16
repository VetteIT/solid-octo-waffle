#!/bin/bash
# Скрипт для конвертації відео файлів за допомогою ffmpeg
# Використання: bash convert-videos.sh

SOURCE_DIR="src/assets/BirthdayPhotoAndVid"
OUTPUT_DIR="$SOURCE_DIR/converted"

# Створюємо папку для конвертованих файлів, якщо її немає
mkdir -p "$OUTPUT_DIR"

# Масив відео файлів для конвертації
declare -a videos=(
    "2014-05-22_robot-build.mp4"
    "2011-12-10_sleigh-ride.mp4"
    "2018-06-30_star-performance.mp4"
)

for video in "${videos[@]}"; do
    INPUT_PATH="$SOURCE_DIR/$video"
    OUTPUT_NAME="${video%.mp4}-converted.mp4"
    OUTPUT_PATH="$OUTPUT_DIR/$OUTPUT_NAME"
    
    if [ -f "$INPUT_PATH" ]; then
        echo "Конвертую: $video"
        ffmpeg -i "$INPUT_PATH" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$OUTPUT_PATH"
        
        if [ $? -eq 0 ]; then
            echo "✓ Успішно конвертовано: $OUTPUT_NAME"
        else
            echo "✗ Помилка при конвертації: $video"
        fi
    else
        echo "Файл не знайдено: $INPUT_PATH"
    fi
done

echo ""
echo "Конвертацію завершено!"

