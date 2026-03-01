import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const updatedData = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'goals.json');

    // Write updated data to file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Goals updated successfully' });
  } catch (error) {
    console.error('Error saving goals:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save goals. This may not work in production (Vercel). Edit locally and redeploy.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'goals.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading goals:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to load goals' },
      { status: 500 }
    );
  }
}
