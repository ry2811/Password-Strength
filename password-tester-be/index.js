const express = require('express');
const cors = require('cors');
const zxcvbn = require('zxcvbn');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://password-strength-navy.vercel.app' 
}));
app.use(express.json());

// Tạo từ điển từ thông tin cá nhân
function generateDictionaryFromPII(pii) {
  const dictionary = [];

  if (pii.name) {
    const nameParts = pii.name.toLowerCase().split(' ');
    dictionary.push(...nameParts);
    dictionary.push(pii.name.toLowerCase().replace(/\s+/g, ''));
  }

  if (pii.nickname) { 
    dictionary.push(pii.nickname.toLowerCase());
  }

  if (pii.birthday) {
    const parts = pii.birthday.split(/[\/\-\.]/);
    dictionary.push(...parts);
    
    if (parts.length === 3) {
      const [day, month, year] = parts;
      dictionary.push(day + month);
      dictionary.push(month + day);
      dictionary.push(day + month + year);
      dictionary.push(month + day + year);
      dictionary.push(year);
      dictionary.push(year.slice(-2));
      dictionary.push(day + month + year.slice(-2));
    }
  }

  const uniqueDictionary = [...new Set(dictionary.filter(Boolean))];
  console.log('📚 Từ điển:', uniqueDictionary);
  return uniqueDictionary;
}

// API check password
app.post('/check-password', (req, res) => {
  console.log('🔍 Nhận yêu cầu kiểm tra password');

  try {
    const { password, name, birthday, nickname } = req.body;

    if (!password) {
      return res.status(400).json({ 
        error: 'Password is required',
        message: 'Vui lòng nhập mật khẩu'
      });
    }

    console.log('📝 Thông tin:', {
      name,
      birthday,
      nickname,
      passwordLength: password.length
    });

    const userDictionary = generateDictionaryFromPII({ name, birthday, nickname });
    const analysis = zxcvbn(password, userDictionary);

    const result = {
      score: analysis.score,
      feedback: {
        warning: analysis.feedback.warning || 'Không có cảnh báo',
        suggestions: analysis.feedback.suggestions || []
      },
      crackTime: analysis.crack_times_display.offline_fast_hashing_1e10_per_second,
      crackTimeOnline: analysis.crack_times_display.online_no_throttling_10_per_second,
      guesses: analysis.guesses,
      calcTime: analysis.calc_time,
      matchSequence: analysis.sequence.map(match => ({
        pattern: match.pattern,
        token: match.token,
        dictionaryName: match.dictionary_name || 'N/A',
        rank: match.rank || 'N/A'
      }))
    };

    console.log('✅ Score:', result.score, '| Crack time:', result.crackTime);
    res.json(result);

  } catch (error) {
    console.error('❌ Lỗi:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Có lỗi xảy ra khi phân tích mật khẩu'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại cổng ${PORT}`);
});