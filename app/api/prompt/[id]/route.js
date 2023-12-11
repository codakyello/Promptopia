import { connectToDB } from "@app/utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  console.log(req);

  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response("Prompt was not found", { status: 500 });
  }
};
export const POST = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Post Successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt");
  }
};
