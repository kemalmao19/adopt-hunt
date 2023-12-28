// sepertinya ini tidak mempengaruhi apa2

// import { uploadFile } from "@/lib/uploadFile";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get("file");
//   const dir = formData.get("dir");

//   try {
//     await uploadFile({
//         Body: file,
//         Key: file.name,
//         ContentType: file.type,
//         Dir: dir,
//     })
//   } catch (error) {
//     console.log(error)
//   }
//   return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 });
// }
