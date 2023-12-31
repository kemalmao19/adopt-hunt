export async function GET(req) {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { errorMessage: "Something went wrong. Please try again later" },
        { status: 500 }
      );
    }
  }
  