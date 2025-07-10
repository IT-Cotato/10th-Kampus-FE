export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 커밋 타입 규칙
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드 추가/수정
        'chore', // 빌드 업무 수정, 패키지 매니저 수정 등
        'perf', // 성능 개선
        'ci', // CI/CD 관련
        'build', // 빌드 시스템 또는 외부 종속성에 영향을 주는 변경사항
      ],
    ],

    // 커밋 타입 소문자, 비어있으면 안됨
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // 제목 50자 이하, 비어있거나 마침표로 끝나면 안됨
    'subject-max-length': [2, 'always', 50],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    // 본문, 푸터 72자 이하로 줄바꿈
    'body-max-line-length': [2, 'always', 72],
    'footer-max-line-length': [2, 'always', 72],
  },

  parserPreset: {
    parserOpts: {
      // 기본 형식: type: subject
      // 예: feat: 새로운 기능 추가
      headerPattern: /^(\w*): (.*)$/,
      headerCorrespondence: ['type', 'subject'],
      maxLineLength: 72,
    },
  },
};
