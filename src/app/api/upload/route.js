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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const newFileNameBase64 = Buffer.from(fileName).toString('base64');

  const path = `./public/uploads/collections/${newFileNameBase64}.${fileExtension}`;
  await writeFile(path, buffer);

  return NextResponse.json({
    success: true,
    filename: `${newFileNameBase64}.${fileExtension}`,
  });
}
