const uniList = [
    { city: "أدرار", universities: ["جامعة أدرار"] },
    { city: "الشلف", universities: ["جامعة حسيبة بن بوعلي - الشلف"] },
    { city: "الأغواط", universities: ["جامعة عمار ثليجي"] },
    { city: "أم البواقي", universities: ["جامعة العربي بن مهيدي - أم البواقي"] },
    { city: "باتنة", universities: ["جامعة باتنة 1", "جامعة باتنة 2"] },
    { city: "بجاية", universities: ["جامعة بجاية"] },
    { city: "بسكرة", universities: ["جامعة محمد خيضر", "كلية الحقوق والعلوم السياسية والعلاقات الدولية بسكرة"] },
    { city: "بشار", universities: ["جامعة محمد طاهري"] },
    { city: "البليدة", universities: ["جامعة سعد دحلب (البليدة 1)", "جامعة علي لونيسي (البليدة 2)", "المدرسة الوطنية العليا للري"] },
    { city: "البويرة", universities: ["جامعة محند والحاج"] },
    { city: "تمنراست", universities: ["جامعة أمين العقال الحاج موسى آق أخاموك (تمنراست)"] },
    { city: "تبسة", universities: ["جامعة العربي التبسي (تبسة)"] },
    { city: "تلمسان", universities: ["جامعة أبي بكر بلقايد"] },
    { city: "تيارت", universities: ["جامعة ابن خلدون (تيارت)"] },
    { city: "تيزي وزو", universities: ["جامعة مولود معمري"] },
    { city: "الجزائر", universities: ["جامعة الجزائر 1", "جامعة الجزائر 2", "جامعة الجزائر 3", "المدرسة الوطنية للإدارة", "المدرسة العليا الجزائرية للأعمال", "المدرسة الوطنية التحضيرية لدراسات المهندس", "المدرسة الوطنية العليا للتكنولوجيا بالجزائر", "المجلس الأعلى للغة العربية بالجزائر", "المحافظة السامية للأمازيغية", "كلية العلوم الإسلامية في الجزائر", "كلية الحقوق ببن عكنون", "كلية العلوم الطبية في الجزائر", "المعهد الوطني للعلوم الفلاحية", "المعهد الوطني الجزائري للبحث الزراعي", "المعهد الوطني للبريد وتكنولوجيات الإعلام والاتصال", "جامعة العلوم والتكنولوجيا هواري بومدين", "جامعة التكوين المتواصل", "المدرسة العليا للفنون الجميلة بالجزائر", "المعهد الوطني للخرائط", "المدرسة الوطنية العليا للإعلام الآلي", "المدرسة الوطنية العليا للذكاء الاصطناعي", "المدرسة الوطنية متعددة التقنيات بالجزائر", "المدرسة الوطنية للأشغال العمومية", "المدرسة المتعدة التقنيات للهندسة المعمارية والعمران", "المدرسة التحضيرية للعلوم والتقنيات بالجزائر", "المدرسة الوطنية العليا للإحصائيات والاقتصاد التطبيقي بالجزائر", "المعهد العالي للتسيير والتخطيط", "المعهد الوطني للفنون الدرامية", "المدرسة الوطنية العليا للبيطرة", "مركز البحث في علم الفلك والفيزياء الفلكية والجيوفيزياء", "الوكالة الفضائية الجزائرية", "الديوان الوطني للإحصائيات بالجزائر", "المعهد الوطني للأبحاث الغابية", "مركز التنوع البيئي بالرغاية", "مركز التنوع البيئي بزرالدة", "المركز الوطني لختم الطيور", "محطة الأبحاث الغابية ببراقي"] },
    { city: "الجلفة", universities: ["جامعة زيان عاشور"] },
    { city: "جيجل", universities: ["جامعة جيجل"] },
    { city: "سطيف", universities: ["جامعة فرحات عباس (جامعة سطيف 1)", "جامعة محمد لمين دباغين (جامعة سطيف 2)", "معهد البناء والأشغال العمومية", "المدرسة العليا للأساتذة (العلمة)", "المعهد التكنولوجي الفلاحي", "معهد البيئة للتنمية المستدامة،(معهد الدراسات والبحوث البيئية)", "كلية العلوم الطبية (الباز)", "معهد الهندسة المعمارية وعلوم الأرض"] },
    { city: "سعيدة", universities: ["جامعة سعيدة"] },
    { city: "سكيكدة", universities: ["جامعة 20 أوت 1955م", "المدرسة العليا للتعليم التكنولوجي في سكيكدة"] },
    { city: "سيدي بلعباس", universities: ["جامعة جيلالي اليابس", "المدرسة الوطنية العليا للإعلام الآلي بسيدي بلعباس"] },
    { city: "عنابة", universities: ["جامعة باجي مختار 1", "جامعة عنابة 2 (بيولوجيا هندسية معمارية) سيدي عمار", "جامعة عنابة 3 (طب . صيدلة. اداب ولغات ) أحمد البوني", "كلية الطب عنابة", "كلية الحقوق عنابة", "المدرسة العليا للعلوم الاقتصادية عنابة", "المدرسة العليا للاعلام الآلي عنابة"] },
    { city: "قالمة", universities: ["جامعة 8 ماي 1945م"] },
    { city: "قسنطينة", universities: ["جامعة قسنطينة 1 -منتوري", "المدرسة الوطنية متعددة التقنيات بقسنطينة", "المدرسة التحضيرية للعلوم الاقتصادية، التجارية وعلوم التسيير بقسنطينة", "جامعة قسنطينة 2 -عبد الحميد مهري", "جامعة قسنطينة 3 -صالح بوبنيدر", "جامعة الأمير عبد القادر", "كلية الطب بقسنطينة أو معهد باستور بقسنطينة.", "جامعة زرزارة للهندسة المعمارية والعلوم التقنية.", "كلية علوم البيطرة بالخروب"] },
    { city: "المدية", universities: ["جامعة الدكتور يحيى فارس"] },
    { city: "مستغانم", universities: ["جامعة مستغانم"] },
    { city: "المسيلة", universities: ["جامعة محمد بوضياف"] },
    { city: "معسكر", universities: ["جامعة مصطفى أسطمبولي (معسكر)"] },
    { city: "ورقلة", universities: ["جامعة قاصدي مرباح"] },
    { city: "وهران", universities: ["جامعة العلوم والتكنولوجيا محمد بوضياف", "جامعة السانية", "جامعة وهران 2", "المدرسة الوطنية متعددة التقنيات بوهران", "المدرسة التحضيرية للعلوم والتقنيات بوهران", "معهد الاتصالات السلكية واللاسلكية"] },
  ];
  
  export default uniList;
  