import axios from "axios";

const buildStoryPrompt = (profession) => {
  const safeProfession = profession || "leader";
  return (
    `Write a short, uplifting story (150-250 words) about an inspiring woman ` +
    `who works as a ${safeProfession}. The tone should be positive, empowering, and inclusive. ` +
    `Avoid using real person names; create a fictional character.`
  );
};

const buildMentorPrompt = (question) => {
  const safeQuestion = question || "How can women grow in their careers while staying confident?";
  return (
    `You are an experienced, supportive career mentor focused on empowering women around the world.\n\n` +
    `Question from a woman:\n"${safeQuestion}"\n\n` +
    `Provide a thoughtful, practical answer (150-250 words) that is encouraging, specific, and sensitive ` +
    `to challenges women may face (bias, lack of representation, confidence, work-life balance). ` +
    `Use an inclusive tone, avoid legal or medical advice, and do not ask for personal data.`
  );
};

const callChatCompletion = async (prompt, systemPrompt) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 300
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      timeout: 15000
    }
  );

  return response.data?.choices?.[0]?.message?.content?.trim() || null;
};

export const generateStory = async (req, res, next) => {
  const { profession } = req.body || {};

  try {
    const storyFromAi = await callChatCompletion(
      buildStoryPrompt(profession),
      "You are a supportive writer creating short, empowering stories about women around the world."
    );

    if (!storyFromAi) {
      const safeProfession = profession || "professional";
      const fallbackStory = `In a bustling city, a woman named Asha quietly transformed the world around her. As a dedicated ${safeProfession}, she refused to accept the limits others tried to place on her. Each morning, she mentored younger women, reminding them that their ideas mattered. Each afternoon, she challenged outdated assumptions in every meeting she attended. Slowly, the office she worked in began to change: more women spoke up, more voices were heard, and more empathy guided every decision.\n\nAsha’s impact reached far beyond her job title. Her courage to show up fully, to bring both strength and kindness into every room, reminded everyone that leadership isn’t about being the loudest. It’s about lifting others as you rise. And though she never sought recognition, the lives she touched carried her story forward—proof that when one woman steps into her power, entire communities can rise with her.`;

      return res.json({ story: fallbackStory, generated: false });
    }

    return res.json({ story: storyFromAi, generated: true });
  } catch (error) {
    console.error("AI story generation error", error.message);
    const safeProfession = req.body?.profession || "professional";
    const fallbackStory = `A woman in the role of a ${safeProfession} decided that every challenge she faced would become a stepping stone for someone else. When doors were closed to her, she pushed them open a little wider so others could follow. Her story is a reminder that every woman’s journey—no matter how ordinary it may seem—carries the power to inspire, to heal, and to lead.`;
    res.status(200).json({ story: fallbackStory, generated: false });
  }
};

export const mentorAnswer = async (req, res, next) => {
  const { question } = req.body || {};

  try {
    const answerFromAi = await callChatCompletion(
      buildMentorPrompt(question),
      "You are a trusted, supportive career and life mentor for women, offering practical, safe, and empowering guidance."
    );

    if (!answerFromAi) {
      const fallback = `Every woman’s path into a new field starts with a single, often uncertain step. Begin by learning the basics through free online resources, short courses, or local workshops so you can explore the subject at your own pace. Seek out communities—online groups, local meetups, or mentorship circles—where women share similar interests. These spaces can provide encouragement, referrals, and honest conversations about the challenges you might face.\n\nAs you learn, build a small portfolio of projects or experiences that show your curiosity and commitment. Remember that asking questions, setting boundaries, and advocating for yourself are strengths, not weaknesses. Progress may feel slow at times, but every hour you invest in your growth is an investment in your future. You deserve to be in rooms where your ideas are heard, your skills are valued, and your potential is recognised.`;
      return res.json({ answer: fallback, generated: false });
    }

    return res.json({ answer: answerFromAi, generated: true });
  } catch (error) {
    console.error("AI mentor error", error.message);
    const fallback = `Starting or growing a career can feel overwhelming, but you do not have to do it perfectly or all at once. Begin by clarifying what interests you and what kind of work environment supports your well-being. From there, take small, consistent actions—learning a new skill, reaching out to someone you admire, or applying for an opportunity even if you don’t meet every single requirement.\n\nRemember that many women experience self-doubt because of the messages they’ve received, not because they lack talent. Surround yourself with people who respect your ambitions and remind you of your strengths. Your questions, your boundaries, and your voice all matter. You are allowed to take up space in any field you care about.`;
    res.status(200).json({ answer: fallback, generated: false });
  }
};

