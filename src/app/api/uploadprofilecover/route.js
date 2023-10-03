import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

// Define allowed file types and maximum file size (100MB)
const allowedFileTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'];
const maxFileSize = 100 * 1024 * 1024; // 100MB in bytes

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  const fileName = data.get('filename');

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' });
  }

  const fileExtension = file.name.split('.').pop();
  const fileType = file.type;

  // Check if the file type is allowed
  if (!allowedFileTypes.includes(fileType)) {
    return NextResponse.json({ success: false, error: 'Invalid file type' });
  }

  // Check if the file size is within the limit
  if (file.size > maxFileSize) {
    return NextResponse.json({
      success: false,
      error: 'File size exceeds the limit',
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const newFileNameBase64 = Buffer.from(fileName).toString('base64');

  const path = `./public/uploads/users/banner/${newFileNameBase64}.${fileExtension}`;
  await writeFile(path, buffer);

  return NextResponse.json({
    success: true,
    filename: `${newFileNameBase64}.${fileExtension}`,
  });
}
