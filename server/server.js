const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const upload = multer({ dest: 'uploads/' });

// configure with your OpenAI API key
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that estimates food calories from an image.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please estimate the calories in this meal. Only return a number in kcal.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ]
    });

    const responseText = completion.choices[0].message.content.trim();
    res.json({ calorie: responseText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze image' });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
