import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';

// .env.local 로드
dotenv.config({ path: '.env.local' });

const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY,
    baseURL: 'https://api.x.ai/v1',
});

const systemPrompt = `
You are an expert Git commit message generator.
Analyze the provided git diff and generate a commit message that helps fellow developers perfectly understand the intent of the changes.

[Rules]
- Format: [type]: [Korean summary]
- Types: feat|fix|refactor|docs|style|test|chore
- Structure:
    - First line = core outcome (max 60 chars)
    - 2~5 bullets: What + How/Why
    - Mention function/variable/library names
- Forbidden: No markdown, no code blocks, no greetings. Output commit message only.

[Writing Guide]
- Increase specificity by mentioning function names, variable names, and library names.
- Use concrete actions like 'logic separation', 'memoization applied', 'error handling added' instead of vague words like 'fix' or 'improve'.
- Keep detail bullets to 5 or fewer.
- Ignore auto-generated files: package-lock.json, yarn.lock, *.lock
- Order bullets by importance: core logic changes first, config/dependency changes last.
- IMPORTANT: Write all commit messages in Korean.

Example:
refactor: 얼굴 감지 훅의 불필요한 연산 제거 및 메모리 최적화

- useMemo를 적용하여 감지 핸들러의 참조 무결성 유지
- throttle 주기를 100ms에서 200ms로 조정하여 CPU 점유율 완화
- 감지 실패 시 예외 처리 로직 추가로 서비스 안정성 확보
`.trim();

async function generateCommitMessage() {
    try {
        const diff = execSync('git diff --cached --no-color --unified=1', { encoding: 'utf-8' });

        if (!diff.trim()) {
            console.log('Staged 변경사항 없음.');
            process.exit(1);
        }

        const response = await client.chat.completions.create({
            model: 'grok-4-1-fast-reasoning',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Git diff:\n\n${diff}` },
            ],
            temperature: 0.1,
            max_tokens: 300,
        });

        let commitMsg = response.choices?.[0]?.message?.content?.trim() || '';

        if (!commitMsg.includes(':')) {
            commitMsg = 'chore: 코드 변경사항 커밋';
        }
        const firstLine = commitMsg.split('\n')[0];
        if (firstLine.length > 60) {
            commitMsg = 'chore: 코드 변경사항 커밋';
        }

        fs.writeFileSync('/tmp/ai_commit_msg.txt', commitMsg);
        // console.log(`✓ 생성된 커밋 메시지: ${commitMsg}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ AI 커밋 메시지 생성 실패:', error.message);
        fs.writeFileSync('/tmp/ai_commit_msg.txt', 'chore: 코드 변경사항 커밋');
        process.exit(1);
    }
}

generateCommitMessage();
