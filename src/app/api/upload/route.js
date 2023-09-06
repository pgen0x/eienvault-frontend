import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  const fileName = data.get('filename');

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const fileExtension = file.name.split('.').pop();
  const newFileName = `${fileName}.${fileExtension}`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `./public/uploads/collections/${newFileName}`;
  await writeFile(path, buffer);

  return NextResponse.json({ success: true, newFileName });
}
