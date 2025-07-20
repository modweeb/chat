function bloggerGemini(config) {
    // 1. التحقق من وجود العنصر في الصفحة
    const container = document.querySelector(config.elementContainer);
    if (!container) {
        console.error("العنصر غير موجود في الصفحة!");
        return;
    }

    // 2. بناء واجهة المستخدم
    container.innerHTML = `
        <div class="gemini-widget">
            <input type="text" class="input-field" placeholder="اكتب سؤالك هنا..." />
            <button class="submit-btn">إرسال</button>
            <div class="response" style="white-space: pre-wrap;"></div> <!-- دعم الأسطر الجديدة -->
        </div>
    `;

    // 3. تعريف عناصر الواجهة
    const input = container.querySelector('.input-field');
    const button = container.querySelector('.submit-btn');
    const responseDiv = container.querySelector('.response');

    // 4. حدث النقر على الزر
    button.addEventListener('click', async () => {
        const prompt = input.value.trim();
        if (!prompt) {
            responseDiv.textContent = "الرجاء كتابة سؤال أولاً!";
            return;
        }

        responseDiv.textContent = "جاري معالجة طلبك... ⌛";
        
        try {
            // 5. الاتصال بـ Gemini API
            const answer = await fetchGeminiResponse(prompt, config.config.apiKey);
            responseDiv.textContent = answer;
        } catch (error) {
            console.error("Error:", error);
            responseDiv.textContent = `⚠️ حدث خطأ: ${error.message}\n(تأكد من صحة API_KEY)`;
        }
    });
}

// 6. دالة الاتصال الفعلي بـ Gemini API
async function fetchGeminiResponse(prompt, apiKey) {
    // تأكد من وجود مفتاح API
    if (!apiKey || apiKey === "API_KEY_GOES_HERE") {
        throw new Error("لم يتم تعيين مفتاح API");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    const data = await response.json();
    
    // معالجة الأخطاء من API
    if (!response.ok) {
        throw new Error(data.error?.message || "فشل الاتصال بـ Gemini API");
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم العثور على إجابة";
}
