export const cheatSheetData = [
  // ================= 1. Data Access & Structures =================
  {
    "id": "da-lists",
    "category": "1. Data Access & Structures",
    "title": "List Indexing, Slicing & Assignments",
    "level": "Beginner",
    "whenToUse": [
      "ใช้ดึงข้อมูลบางส่วนหรือช่วงข้อมูลจาก List (Extracting sub-arrays)",
      "ใช้กลับด้านข้อมูล (Reversing a list)",
      "ใช้แทนที่ข้อมูลหลายตัวใน List พร้อมกันผ่านการทำ Slicing Assignment"
    ],
    "deepExplanation": "Lists ใน Python ถูกจัดการด้วย Dynamic Arrays เมื่อเราใช้การ Slicing (`[start:stop:step]`) Python จะสร้าง List ขึ้นมาใหม่ในหน่วยความจำ (Shallow Copy) แทนที่จะแก้ไขตัวเดิม การทำ Slicing Assignment ช่วยให้สามารถแทรกหรือลดทอนส่วนของ List ได้โดยตรง",
    "syntaxCode": "nums = [10, 20, 30, 40, 50, 60, 70]\n\n# Basic Slicing [start:stop:step]\nprint(nums[1:5])      # [20, 30, 40, 50]\nprint(nums[::2])      # [10, 30, 50, 70] (Every 2nd element)\nprint(nums[::-1])     # [70, 60, 50, 40, 30, 20, 10] (Reverse)\n\n# Slicing Assignment\nnums[1:3] = [999]\nprint(nums)           # [10, 999, 40, 50, 60, 70] - Replaced 2 items with 1",
    "dataAccessAndUnpacking": "# Safe access using standard indexing\nfirst = nums[0]\nlast = nums[-1]\n\n# Unpacking the first and last elements\nfirst, *middle, last = nums\nprint(middle) # [999, 40, 50, 60]",
    "edgeCasesAndErrors": "ระวังการดึง Index ที่ไม่อยู่ใน List (`IndexError`) การทำ Slicing จะไม่เกิด Error ถ้าระบุช่วงเกินขนาดของ List แต่มันจะคืนค่า List ว่างกลับมาแทน",
    "quiz": [
      {
        "question": "What is the output of `[1, 2, 3, 4, 5][::-2]`?",
        "options": ["A) [5, 3, 1]", "B) [1, 3, 5]", "C) [4, 2]"],
        "correctIndex": 0,
        "explanation": "[::-2] เริ่มจากท้ายสุดแล้วกระโดดทีละ 2 ค่าแบบย้อนกลับ"
      }
    ]
  },
  {
    "id": "da-dictionaries",
    "category": "1. Data Access & Structures",
    "title": "Dictionary Deep Dive & Comprehensions",
    "level": "Intermediate",
    "whenToUse": [
      "ใช้จัดกลุ่มคู่ข้อมูล Key-Value (เช่น เก็บการตั้งค่า หรือ Response จาก JSON API)",
      "ใช้ .get() เพื่อหลีกเลี่ยงข้อผิดพลาดโปรแกรมพังเมื่อคีย์ไม่มีอยู่ใน Dict",
      "ใช้ Dict Comprehension เพื่อสร้าง Dictionary จาก Iterable ได้รวดเร็ว"
    ],
    "deepExplanation": "Dictionaries ใน Python อาศัยกลไก Hash Tables ในระดับรากฐาน ทำให้เข้าถึงข้อมูลผ่านคีย์ได้แบบ O(1) กลไกของ `.get()` และ `.setdefault()` ถูกออกแบบมาเพื่อทำ Fallback หรือ Default Value ให้กับ Hash Lookup เพื่อความปลอดภัย",
    "syntaxCode": "config = {'theme': 'dark'}\n\n# Safely accessing values\ncolor = config.get('color', 'blue') # Returns 'blue' if not found\n\n# setdefault: Sets the key if not exists, then returns it\nbg = config.setdefault('bg', 'black')\n\n# Dict Comprehension\nsquares = {x: x**2 for x in range(1, 6) if x % 2 != 0}\nprint(squares) # {1: 1, 3: 9, 5: 25}",
    "dataAccessAndUnpacking": "user = {\n  'id': 1,\n  'profile': {'name': 'Alice', 'role': 'Admin'}\n}\n\n# Nested Dict Access\nrole = user.get('profile', {}).get('role', 'Guest')\n\n# Iterating\nfor key, val in user.items():\n    print(f\"{key} -> {val}\")",
    "edgeCasesAndErrors": "การเข้าถึง Key ที่ไม่มีอยู่ด้วย `dict[key]` จะทำให้เกิด `KeyError` เสมอ แนะนำให้ใช้ `.get()` แทนหากไม่แน่ใจว่าคีย์มีอยู่จริง",
    "quiz": [
      {
        "question": "What does `.setdefault('k', 'v')` do if 'k' already exists?",
        "options": ["A) Overwrites 'k' with 'v'", "B) Returns the existing value of 'k'", "C) Throws an Error"],
        "correctIndex": 1,
        "explanation": ".setdefault จะคืนค่าเดิมกลับมาถ้า Key มีอยู่แล้ว และจะไม่เขียนทับค่าใหม่"
      }
    ]
  },
  {
    "id": "da-nested",
    "category": "1. Data Access & Structures",
    "title": "List of Dicts & Dict of Lists",
    "level": "Intermediate",
    "whenToUse": [
      "ใช้จัดการข้อมูล JSON ที่ได้มาจาก Web APIs (ส่วนใหญ่อยู่ในรูปแบบ List of Dicts)",
      "ใช้เก็บตารางข้อมูล 2 มิติ (DataFrames อย่างง่าย) ในรูปแบบ Dict of Lists"
    ],
    "deepExplanation": "โครงสร้างซ้อนโครงสร้าง (Nested Structures) อาศัยการทำ Reference Memory ใน Python การเข้าถึงข้อมูลต้องทำแบบลดหลั่น (Cascading lookups) ประสิทธิภาพการดึงค่ายังคงเป็น O(1) ต่อ 1 ระดับความลึก",
    "syntaxCode": "# List of Dicts\nusers = [\n    {\"id\": 1, \"name\": \"Alice\", \"tags\": [\"admin\", \"staff\"]},\n    {\"id\": 2, \"name\": \"Bob\", \"tags\": [\"user\"]}\n]\n\n# Dict of Lists\ndepartment = {\n    \"engineering\": [\"Alice\", \"Charlie\"],\n    \"sales\": [\"Bob\", \"Dave\"]\n}\n\n# Extracting all names\nnames = [u[\"name\"] for u in users]\nprint(names)",
    "dataAccessAndUnpacking": "# Accessing deeply nested data safely\nfirst_user_first_tag = users[0].get(\"tags\", [])[0] if users else None\n\n# Iterating nested structures\nfor dept, staff_list in department.items():\n    for staff in staff_list:\n        print(f\"{staff} is in {dept}\")",
    "edgeCasesAndErrors": "ระวัง `IndexError` กับลิสต์ว่าง และ `KeyError` ระหว่างเจาะข้อมูล ต้องเช็คความยาวและตรวจสอบว่าค่าคืนมาไม่ใช่ `None` ก่อนดึงค่าเชิงลึก",
    "quiz": [
      {
        "question": "How do you securely extract the first tag of the second user in a list of dicts?",
        "options": ["A) users[1]['tags'][0]", "B) users.get(1).get('tags')[0]", "C) users[1].get('tags', [])[0] if len(users) > 1 else None"],
        "correctIndex": 2,
        "explanation": "ต้องเช็คขนาดของ List (len > 1) เพื่อหลีกเลี่ยง IndexError ก่อนดึงจาก Dict"
      }
    ]
  },
  {
    "id": "da-tuples",
    "category": "1. Data Access & Structures",
    "title": "Tuples & Immutable Data Access",
    "level": "Intermediate",
    "whenToUse": [
      "ใช้เพื่อรวมกลุ่มค่าหลายๆ ค่าที่ห้ามมีการเปลี่ยนแปลงในภายหลัง",
      "ใช้ Return ค่าหลายๆ ตัวออกจากฟังก์ชันเดียว (Multiple Return Values)",
      "ใช้เป็นคีย์สำหรับ Dictionary หรือนำไปใส่ใน Set"
    ],
    "deepExplanation": "Tuples เป็น Immutable (เปลี่ยนค่าไม่ได้) ทำให้ Python สามารถ Optimize การจองหน่วยความจำแบบ Fix-size ได้รวดเร็วกว่า List มากและมีความปลอดภัยจากการถูกแก้ไขระหว่างการทำงาน (Thread-safety in logic).",
    "syntaxCode": "# Creating Tuples\ncoords = (13.75, 100.50)\nsingle_item = (42,) # Note the comma\n\n# Function returning tuple\ndef get_user():\n    return 1, \"Alice\", \"admin\"\n\nuid, name, role = get_user()",
    "dataAccessAndUnpacking": "data = (\"apple\", \"banana\", \"cherry\", \"date\", \"elderberry\")\n\n# Extended Unpacking (Python 3+)\nfirst, *middle, last = data\n\nprint(first)  # apple\nprint(middle) # ['banana', 'cherry', 'date']\nprint(last)   # elderberry\n\n# Ignoring values with underscore\nid, _, status = (101, 'secret_token', 'active')",
    "edgeCasesAndErrors": "หากตัวแปรที่รับตอน Unpack มีจำนวนไม่เท่ากับจำนวนค่าใน Tuple และไม่ได้ใช้ `*` จะเกิด `ValueError: too many/not enough values to unpack`",
    "quiz": [
      {
        "question": "What is the data type of `x = (5)`?",
        "options": ["A) int", "B) tuple", "C) list"],
        "correctIndex": 0,
        "explanation": "ใส่วงเล็บเฉยๆ เป็น Integer หากต้องการให้เป็น Tuple ที่มี 1 ตัว ต้องมีลูกน้ำ `(5,)`"
      }
    ]
  },
  {
    "id": "da-sets",
    "category": "1. Data Access & Structures",
    "title": "Sets & Frozen Sets",
    "level": "Advanced",
    "whenToUse": [
      "ใช้กำจัดข้อมูลที่ซ้ำซ้อนอย่างรวดเร็ว O(n)",
      "ใช้เช็คว่ามีค่าอยู่ในกลุ่มไหม (Fast Membership Testing O(1))",
      "ใช้จัดการทางคณิตศาสตร์ตรรกศาสตร์ (Union, Intersection, Difference)"
    ],
    "deepExplanation": "Sets ถูกอิมพลีเมนต์ด้วย Hash Table (คล้าย Dict แต่ไม่มี Values มีเฉพาะ Keys) จึงไม่รองรับ Indexing การดึงข้อมูลไวมาก O(1). `frozenset` เป็นเซตแบบเปลี่ยนค่าไม่ได้ (Immutable) ซึ่งสามารถนำไปเป็น Key ของ Dict ได้",
    "syntaxCode": "set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\n\nprint(set_a | set_b)  # Union: {1, 2, 3, 4, 5, 6}\nprint(set_a & set_b)  # Intersection: {3, 4}\nprint(set_a - set_b)  # Difference (A - B): {1, 2}\nprint(set_a ^ set_b)  # Symmetric Diff (Outer only): {1, 2, 5, 6}\n\n# Frozenset\nfs = frozenset([1, 2, 3])\n# fs.add(4) -> AttributeError",
    "dataAccessAndUnpacking": "# Since sets are unordered, you cannot use indexing (e.g., set_a[0] is invalid)\n\n# Checking membership (Extremely Fast O(1))\nif 3 in set_a:\n    print(\"Found 3!\")\n\n# Converting to list if indexing is necessary\nunique_items = list(set_a)\nprint(unique_items[0])",
    "edgeCasesAndErrors": "เซตไม่สนใจลำดับของข้อมูล หากต้องการเก็บลำดับด้วยให้ใช้ Dict (`dict.fromkeys(list)`) และสิ่งที่นำมาใส่ในเซตต้องเป็นข้อมูลประเภท Hashable (พวก List/Dict ใส่ในเซตไม่ได้)",
    "quiz": [
      {
        "question": "Which operator performs a Set Intersection (หาตัวที่ซ้ำกัน)?",
        "options": ["A) |", "B) &", "C) -", "D) ^"],
        "correctIndex": 1,
        "explanation": "เครื่องหมาย `&` ใช้แทน Intersection ส่วน `|` คือ Union"
      }
    ]
  },

  // ================= 2. Control Flow & Loops =================
  {
    "id": "cf-for",
    "category": "2. Control Flow & Loops",
    "title": "For Loop & Iterations",
    "level": "Beginner",
    "whenToUse": [
      "ใช้ทำซ้ำตามจำนวนรอบที่ระบุ (เช่น ผ่าน range())",
      "ใช้วนลูปอ่านค่าใน List, String, หรือ Tuple",
      "ใช้วนลูปดึงข้อมูลทั้ง Key และ Value จาก Dictionary"
    ],
    "deepExplanation": "For loops ใน Python ดึงข้อมูลทีละตัวจาก Iterable Object (ผ่าน `__iter__()` และ `__next__()`) ทำให้มีความปลอดภัย ไม่เสี่ยงที่ index จะเกินขนาดแบบภาษา C",
    "syntaxCode": "# Sequence Iteration\nfor char in \"Python\":\n    print(char, end=\"-\") # P-y-t-h-o-n-\n\nprint() # newline\n\n# Range: start, stop(exclusive), step\nfor i in range(1, 10, 2):\n    print(i, end=\" \") # 1 3 5 7 9",
    "dataAccessAndUnpacking": "user_scores = {'Alice': 95, 'Bob': 82}\n\n# Iterating and unpacking dictionary items\nfor name, score in user_scores.items():\n    print(f\"{name} scored {score}\")\n\n# Unpacking tuples in a list during iteration\npoints = [(1, 2), (3, 4), (5, 6)]\nfor x, y in points:\n    print(f\"X:{x}, Y:{y}\")",
    "edgeCasesAndErrors": "การแก้ค่า List ต้นทาง (Modify) ขณะกำลังวนลูป For จะทำให้ดัชนีเลื่อนและได้ผลลัพธ์ที่ผิดพลาดรุนแรง แนะนำให้ Copy list (ใช้ `[:]`) ก่อนวนลูปแก้ไข",
    "quiz": [
      {
        "question": "What happens if you remove an item from a list while iterating over it in a standard for loop?",
        "options": ["A) It works perfectly", "B) IndexError is raised", "C) Items are skipped because internal indices shift"],
        "correctIndex": 2,
        "explanation": "การลบค่าขณะวนลูปทำให้ขนาดของลิสต์ลดลง แต่ For loop จะอัพเดท Index ไปข้างหน้า ทำให้ข้ามการตรวจสอบไอเทมถัดไป"
      }
    ]
  },
  {
    "id": "cf-for-utils",
    "category": "2. Control Flow & Loops",
    "title": "enumerate(), zip() & zip_longest()",
    "level": "Intermediate",
    "whenToUse": [
      "`enumerate()`: ใช้เมื่อต้องการดึง Index ออกมาพร้อมกับค่าของข้อมูล",
      "`zip()`: ใช้เมื่อต้องการวนลูป List 2 ตัวขึ้นไปพร้อมๆ กันแบบขนาน",
      "`zip_longest()`: ใช้วนลูปหลาย List ที่ความยาวไม่เท่ากัน โดยแทนค่า None ให้กับช่องที่สั้นกว่า"
    ],
    "deepExplanation": "Functions เหล่านี้สร้าง Generator/Iterator Objects แบบ Lazy Evaluation ทำให้ไม่กินหน่วยความจำแม้จะใช้งานกับ Lists ขนาดหลักล้านรายการ",
    "syntaxCode": "names = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = [99, 85]\n\n# Enumerate gets index + item\nfor i, name in enumerate(names, start=1):\n    print(f\"{i}. {name}\")\n\n# Zip iterates in parallel (stops at shortest list)\nfor name, score in zip(names, scores):\n    print(f\"{name} got {score}\")\n\nfrom itertools import zip_longest\n# Zip Longest (fills missing with None or fillvalue)\nfor name, score in zip_longest(names, scores, fillvalue=0):\n    print(f\"{name} got {score}\")",
    "dataAccessAndUnpacking": "# Create a dictionary quickly using zip\nkeys = ['id', 'name', 'role']\nvals = [101, 'Eve', 'Manager']\n\nuser_dict = dict(zip(keys, vals))\nprint(user_dict)",
    "edgeCasesAndErrors": "มาตรฐานของ `zip()` จะหยุดเมื่อ Iterable ตัวที่ 'สั้นที่สุด' หมด หากไม่ระวังจะทำให้ข้อมูลตัวท้ายๆ ใน Iterable ยาวสูญหายไปเงียบๆ",
    "quiz": [
      {
        "question": "Which function provides both the index and the value from an iterable?",
        "options": ["A) range()", "B) zip()", "C) enumerate()"],
        "correctIndex": 2,
        "explanation": "enumerate() จะคืนค่ามาเป็น Tuple (index, value)"
      }
    ]
  },
  {
    "id": "cf-while",
    "category": "2. Control Flow & Loops",
    "title": "While Loops & Sentinels",
    "level": "Beginner",
    "whenToUse": [
      "ใช้เมื่อไม่รู้จำนวนรอบที่แน่นอน (วนลูปจนกว่าเงื่อนไขจะถูกตีตก)",
      "ใช้รัน Event Loop หรือ Game Loop (`while True:`)",
      "ใช้รับค่า Input จาก User จนกว่าจะพิมพ์คำสั่งออก (Sentinel)"
    ],
    "deepExplanation": "While loop ประเมินค่าความจริง (Truthiness) ทุกครั้งก่อนเข้าสู่ Block โค้ด หากเงื่อนไขเป็น False ตั้งแต่แรก จะไม่ถูกรันเลย",
    "syntaxCode": "import random\n\nattempts = 0\nsuccess = False\n\nwhile not success and attempts < 5:\n    attempts += 1\n    roll = random.randint(1, 6)\n    if roll == 6:\n        success = True\n        print(f\"Got 6 in {attempts} attempts!\")\n\nif not success:\n    print(\"Failed after 5 attempts.\")",
    "dataAccessAndUnpacking": "# Sentinel Pattern (Read until a specific value)\n# Normally used for taking continuous inputs:\n'''\nwhile (cmd := input(\"Enter command (q to quit): \")) != 'q':\n    print(f\"Executing {cmd}\")\n'''\nprint(\"Sentinel pattern example in comments.\")",
    "edgeCasesAndErrors": "ลืมอัพเดทค่าตัวแปรเงื่อนไข (เช่น `attempts += 1`) ทำให้เกิด Infinite Loop ส่งผลให้โปรแกรมค้างและกิน CPU 100%",
    "quiz": [
      {
        "question": "What is the primary danger of using a while loop?",
        "options": ["A) Syntax Error", "B) Infinite Loops if conditions never turn False", "C) Memory limit exceeded"],
        "correctIndex": 1,
        "explanation": "การลืมอัพเดทค่าเงื่อนไขจะทำให้เงื่อนไขเป็น True ตลอดกาล เกิด Infinite loop"
      }
    ]
  },
  {
    "id": "cf-control-flow",
    "category": "2. Control Flow & Loops",
    "title": "Loop Controls (break, continue, else)",
    "level": "Intermediate",
    "whenToUse": [
      "`break`: ใช้หยุดและออกจากลูปทันที (มักใช้หาข้อมูลเจอแล้ว)",
      "`continue`: ใช้ข้ามคำสั่งที่เหลือในรอบนั้นๆ และขึ้นรอบใหม่ทันที",
      "`else` on loop: ใช้สั่งงานเมื่อลูปทำงานจบครบทุกรอบโดยไม่ถูก `break`"
    ],
    "deepExplanation": "Python เป็นภาษาที่มี `else` พ่วงหลัง `for` หรือ `while` ได้ ซึ่ง Block `else` จะรันก็ต่อเมื่อลูปทำงานจนสุดทางอย่างสมบูรณ์เท่านั้น (No break encountered). ใช้ลดการประกาศตัวแปร Flag อย่าง `is_found = False`",
    "syntaxCode": "targets = [3, 7, 12, 19]\nsearch_for = 10\n\nfor num in targets:\n    if num == search_for:\n        print(\"Found! Breaking out.\")\n        break\n    if num % 2 == 0:\n        continue # Skip even numbers print\n    print(f\"Checked odd num: {num}\")\nelse:\n    print(f\"Target {search_for} was NOT found in the list.\")",
    "dataAccessAndUnpacking": "# No specific unpacking rules here, mostly logic control.\npass",
    "edgeCasesAndErrors": "หลายคนสับสนคิดว่า `else` หลัง For loop จะทำงานเมื่อลูปไม่ถูกรันเลย แท้จริงแล้วมันรันเมื่อ 'ลูปจบสมบูรณ์แบบไม่โดน break' เสมอ",
    "quiz": [
      {
        "question": "When does the `else` block of a `for` loop execute?",
        "options": ["A) When the list is empty", "B) Only if the loop breaks", "C) When the loop completes normally without hitting a break statement"],
        "correctIndex": 2,
        "explanation": "`else` จะทำงานเมื่อลูปวนครบทุกตัวและจบลงอย่างปกติ โดยไม่ถูกสั่งหยุดด้วย break"
      }
    ]
  },
  {
    "id": "cf-nested-loops",
    "category": "2. Control Flow & Loops",
    "title": "Nested Loops & Matrix Flattening",
    "level": "Advanced",
    "whenToUse": [
      "ใช้ตะลุยผ่านโครงสร้าง 2 มิติ (เช่น ภาพ Grid, หรือตาราง Matrix)",
      "ใช้จับคู่ข้อมูลทุกแบบที่เป็นไปได้ (Cartesian Product)",
      "ใช้ List Comprehension ซ้อนกันเพื่อแบน (Flatten) List 2 มิติเป็น 1 มิติ"
    ],
    "deepExplanation": "Nested Loops ทำให้เกิด Time Complexity ระดับ O(N * M) ซึ่งช้าลงแบบก้าวกระโดดเมื่อข้อมูลใหญ่ขึ้น การแปลงโครงสร้างให้ใช้ Built-in C functions หรือ Numpy จะช่วยลด Overhead ได้มาก",
    "syntaxCode": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Standard Nested Loop\nfor row in matrix:\n    for col in row:\n        print(col, end=' ')\nprint() # newline\n\n# Breaking out of nested loops requires a flag or a function return\ndef find_item(mat, target):\n    for r in range(len(mat)):\n        for c in range(len(mat[r])):\n            if mat[r][c] == target:\n                return (r, c) # Instantly breaks out of ALL loops\n    return None\n\nprint(\"Found 5 at:\", find_item(matrix, 5))",
    "dataAccessAndUnpacking": "# Flattening a 2D matrix into a 1D list using comprehension\nflat_list = [col for row in matrix for col in row]\nprint(\"Flattened:\", flat_list)",
    "edgeCasesAndErrors": "ใน Python ไม่มีคำสั่ง `break 2` เพื่อหยุดการทำงานของลูปซ้อนลูปแบบภาษาอื่น การใช้ `return` ในฟังก์ชันเป็นวิธีที่คลีนที่สุดในการกระโดดออกจากลูปซ้อนกันหลายระดับ",
    "quiz": [
      {
        "question": "In a nested list comprehension `[val for sub in nested for val in sub]`, which loop is the outer loop?",
        "options": ["A) `for sub in nested`", "B) `for val in sub`", "C) They run in parallel"],
        "correctIndex": 0,
        "explanation": "ลำดับใน Comprehension อ่านเหมือนลูปปกติ จากซ้ายไปขวา: ตัวแรกคือลูปนอก ตัวหลังคือลูปใน"
      }
    ]
  },

  // ================= 3. Advanced Python Concepts =================
  {
    "id": "adv-context-managers",
    "category": "3. Advanced Python Concepts",
    "title": "Context Managers (`with`)",
    "level": "Advanced",
    "whenToUse": [
      "ใช้จัดการทรัพยากรที่ต้องเปิดและปิดเสมอ (เช่น ไฟล์, ฐานข้อมูล, Network Connections)",
      "ใช้รับประกันการคืนทรัพยากร (Resource Deallocation) แม้จะเกิด Error ขั้นรุนแรงตรงกลาง"
    ],
    "deepExplanation": "เมื่อใช้คำสั่ง `with` Python จะเรียกใช้ dunder method `__enter__()` ตอนเริ่ม และรับประกันว่าจะเรียก `__exit__()` ตอนจบ (ทำงานคล้าย Finally) ทำให้จัดการ Memory และ File Handles ปลอดภัยจากอาการ Resource Leaks แบบ 100%",
    "syntaxCode": "import tempfile\nimport os\n\n# Standard Usage (Files)\nwith open('temp.txt', 'w') as f:\n    f.write('Hello World!')\n\n# Custom Context Manager via Class\nclass Timer:\n    import time\n    def __enter__(self):\n        self.start = self.time.time()\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print(f\"Execution took: {self.time.time() - self.start:.4f}s\")\n\nwith Timer():\n    # Simulate work\n    sum(i**2 for i in range(100000))\n    \n# Cleanup file\nos.remove('temp.txt')",
    "dataAccessAndUnpacking": "# Variables bound using 'as' are fully available\n# However, after the block, the resource is closed/released.\n# print(f.read()) # Raises ValueError: I/O operation on closed file.",
    "edgeCasesAndErrors": "ตัวแปรที่รับค่ามาจาก `as` (เช่น `with ... as f:`) จะยังคงมีชีวิตอยู่ใน Scope หลังจากหลุดออกจาก `with` ไปแล้ว แต่ตัวสถานะของมันจะถูก 'ปิด' ไปแล้ว (เรียกฟังก์ชันต่อไม่ได้)",
    "quiz": [
      {
        "question": "Which two methods must a custom class implement to be used with the `with` statement?",
        "options": ["A) __start__ and __stop__", "B) __init__ and __del__", "C) __enter__ and __exit__"],
        "correctIndex": 2,
        "explanation": "ระบบ Context Manager ของ Python บังคับใช้ __enter__ ขาเข้า และ __exit__ ขาออกเสมอ"
      }
    ]
  },
  {
    "id": "adv-decorators",
    "category": "3. Advanced Python Concepts",
    "title": "Decorators & Higher-Order Functions",
    "level": "Advanced",
    "whenToUse": [
      "ใช้แทรกโค้ด (Middleware) ก่อนและหลังการเรียกฟังก์ชันอื่น โดยไม่ต้องแก้โค้ดด้านใน",
      "ใช้เช็คสิทธิ์ (Authentication/Authorization) ใน Web Frameworks",
      "ใช้บันทึก Logs, จับเวลา (Timing), หรือการทำ Caching (Memoization)"
    ],
    "deepExplanation": "Decorator คือฟังก์ชันที่รับฟังก์ชันอื่นเข้ามาเป็น Argument แล้วคืนฟังก์ชันตัวใหม่ออกไป (Wrapper) ฟังก์ชันใน Python เป็น First-class citizens จึงส่งข้ามไปมาได้ การใช้ `@wraps` จาก `functools` เป็นเรื่องบังคับเพื่อให้ Metadata (ชื่อและ docstring) ของฟังก์ชันเดิมไม่สูญหายไป",
    "syntaxCode": "from functools import wraps\n\ndef require_auth(func):\n    @wraps(func) # Preserves function metadata\n    def wrapper(*args, **kwargs):\n        user_id = kwargs.get('user_id')\n        if user_id != 1:\n            return \"Access Denied\"\n        return func(*args, **kwargs)\n    return wrapper\n\n@require_auth\ndef get_secret_data(user_id=None):\n    return \"Super Secret Data!\"\n\nprint(get_secret_data(user_id=2))\nprint(get_secret_data(user_id=1))",
    "dataAccessAndUnpacking": "# Accessing function metadata lost without @wraps\nprint(\"Function name:\", get_secret_data.__name__)",
    "edgeCasesAndErrors": "ลืม Return ตัว `wrapper` ออกไปจากฟังก์ชันหลัก หรือลืมคืนค่า (Return) `func(*args, **kwargs)` จากใน wrapper ทำให้ฟังก์ชันหลักไม่ส่งผลลัพธ์กลับไปหาผู้เรียก",
    "quiz": [
      {
        "question": "What is the main purpose of using `@wraps(func)` when building a custom decorator?",
        "options": ["A) To make the decorator execute faster", "B) To preserve the original function's name and docstring", "C) To allow the function to accept unlimited arguments"],
        "correctIndex": 1,
        "explanation": "@wraps จะดึงเอา __name__ และ __doc__ ของฟังก์ชันเดิมมาทับลงบน wrapper เพื่อป้องกันความสับสนตอน Debug"
      }
    ]
  },
  {
    "id": "adv-generators",
    "category": "3. Advanced Python Concepts",
    "title": "Generators & Lazy Evaluation (yield)",
    "level": "Advanced",
    "whenToUse": [
      "ใช้ดึงข้อมูลขนาดใหญ่ระดับ Big Data ที่ไม่สามารถยัดลง Memory ได้พร้อมกัน",
      "ใช้อ่านไฟล์ Logs ขนาดใหญ่ทีละบรรทัด (Streaming)",
      "ใช้สร้างอนุกรมแบบไม่สิ้นสุด (Infinite sequences)"
    ],
    "deepExplanation": "ฟังก์ชันใดๆ ที่ใช้คำสั่ง `yield` จะกลายเป็น Generator Function ทันที การรันฟังก์ชันนี้จะไม่โค้ดในทันที แต่จะคืนค่า Generator Object มาแทน เมื่อมีการเรียก `next()` โค้ดจะทำงานและหยุดพักแบบแช่แข็ง State ไว้ที่คำสั่ง `yield` (Lazy Evaluation) ช่วยประหยัด RAM มหาศาล",
    "syntaxCode": "def fibonacci_gen(limit):\n    a, b = 0, 1\n    count = 0\n    while count < limit:\n        yield a\n        a, b = b, a + b\n        count += 1\n\n# Creates the generator object (does NOT execute logic yet)\nfib = fibonacci_gen(5)\n\n# Execution happens on demand\nprint(next(fib)) # 0\nprint(next(fib)) # 1\n\n# Convert remainder to list\nprint(list(fib)) # [1, 2, 3]",
    "dataAccessAndUnpacking": "# Generator Expressions (Like list comp, but with parentheses)\nlarge_gen = (x**2 for x in range(1_000_000))\nprint(next(large_gen))\nprint(next(large_gen))",
    "edgeCasesAndErrors": "Generator ถูกใช้แล้วทิ้ง (Exhaustible)! หากใช้ `for` หรือ `list()` กวาดข้อมูลออกมาจนหมดแล้ว จะไม่สามารถวนซ้ำได้อีก การเรียก `next()` ครั้งต่อไปจะเกิด `StopIteration` ทันที",
    "quiz": [
      {
        "question": "What happens if you call `next()` on a generator that has already yielded all its values?",
        "options": ["A) It returns None", "B) It resets to the beginning", "C) It raises a StopIteration exception"],
        "correctIndex": 2,
        "explanation": "กลไก Iteration ใน Python จะพ่น StopIteration ออกมาเมื่อไม่มีข้อมูลเหลือแล้ว (For loop จะตรวจจับ exception นี้เงียบๆ เพื่อหยุดทำงาน)"
      }
    ]
  },
  {
    "id": "adv-exceptions",
    "category": "3. Advanced Python Concepts",
    "title": "Exception Handling (try-except-else-finally)",
    "level": "Advanced",
    "whenToUse": [
      "ใช้จัดการข้อผิดพลาดที่ไม่คาดคิดเพื่อไม่ให้โปรแกรมพัง (Graceful Degradation)",
      "ใช้ตรวจสอบ Network Requests หรือ Database Connections ที่อาจจะล้มเหลว",
      "ใช้สร้าง Custom Exception Classes สำหรับการจัดการ Business Logic"
    ],
    "deepExplanation": "โครงสร้าง `try-except` เป็นการดักจับข้อผิดพลาด (Catching) ส่วน `else` จะทำงานก็ต่อเมื่อใน `try` ไม่เกิด Error เลย (ใช้แยกระหว่างโค้ดที่เสี่ยงกับโค้ดที่ทำงานต่อ) และ `finally` จะต้องถูกทำงาน 100% เสมอแม้ว่าจะมี Return/Break/Exception ขั้นรุนแรงก็ตาม (เหมาะสำหรับทำ Cleanup)",
    "syntaxCode": "class InvalidBalanceError(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    try:\n        if amount > balance:\n            raise InvalidBalanceError(f\"Cannot withdraw {amount}. Bal: {balance}\")\n        result = balance - amount\n    except TypeError as e:\n        print(\"System Error: Amount must be a number.\")\n    except InvalidBalanceError as e:\n        print(\"User Error:\", e)\n    else:\n        print(f\"Success! Remaining balance: {result}\")\n        return result\n    finally:\n        print(\"[Transaction Logged]\")\n\nwithdraw(100, 150)\nprint(\"---\")\nwithdraw(100, 50)",
    "dataAccessAndUnpacking": "# Extracting details from the exception object\ntry:\n    1 / 0\nexcept ZeroDivisionError as e:\n    # e.args contains the tuple of arguments passed to Exception\n    print(\"Error details:\", e.args)",
    "edgeCasesAndErrors": "ห้ามใช้ `except Exception:` (Bare Except) หากไม่มีการทำ Logging หรือ Re-raise ต่อ เพราะมันจะกลบ Error ทุกอย่างรวมถึง `KeyboardInterrupt` (Ctrl+C) ทำให้เราไม่รู้เลยว่ามีบั๊กซ่อนอยู่ตรงไหน",
    "quiz": [
      {
        "question": "If a `return` statement is executed inside a `try` block, what happens to the `finally` block?",
        "options": ["A) The finally block is completely skipped", "B) The finally block executes BEFORE the return completes", "C) The finally block executes AFTER the function has returned"],
        "correctIndex": 1,
        "explanation": "finally ถูกการันตีว่าจะต้องทำงานเสมอ Python จะรัน finally block ให้เสร็จก่อนที่จะส่งค่า return จริงๆ กลับไปหาผู้เรียก"
      }
    ]
  }
];
