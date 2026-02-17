export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// export async function PATCH(request: Request) {
//   try {
//     const cookieStore = await cookies();
//     const body = await request.json();

//     const res = await api.patch('/users/me', body, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.status }
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData();
    const json = await request.json().catch(() => ({}));

    const requests: Promise<any>[] = [];

    if (json.username) {
      requests.push(
        api.patch('/users/me/username', { userName: json.username }, {
          headers: { Cookie: cookieStore.toString() },
        })
      );
    }

    const avatarFile = formData.get('avatar') as File | null;
    if (avatarFile) {
      const avatarForm = new FormData();
      avatarForm.append('avatar', avatarFile);

      requests.push(
        api.patch('/users/me/avatar', avatarForm, {
          headers: { Cookie: cookieStore.toString() },
        })
      );
    }

    const results = await Promise.all(requests);

    const updatedData: any = {};
    results.forEach((res) => {
      if (res.data.userName) updatedData.userName = res.data.userName;
      if (res.data.url) updatedData.photoUrl = res.data.url;
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.put('/auth/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });

  } catch (error) {

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { 
          error: error.message, 
          response: error.response?.data 
        },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}