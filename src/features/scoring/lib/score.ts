// export const ratio111Score = (x: number, y: number, z: number) => {
//     // x 이마
//     // y 중안부
//     // z 턱
//     const sumXYZ = x + y + z;

//     if (Math.abs(sumXYZ - 100) > 1e-6) {
//         // 합계가 100이 아닌 경우, 100%가 되도록 재조정
//         x = (x / sumXYZ) * 100;
//         y = (y / sumXYZ) * 100;
//         z = (z / sumXYZ) * 100;
//     }

//     const ideal = 100 / 3;

//     // Δ = |x - ideal| + |y - ideal| + |z - ideal|
//     const delta = Math.abs(x - ideal) + Math.abs(y - ideal) + Math.abs(z - ideal);

//     // 최대 차이
//     const maxDelta = (100 * (3 - 1)) / 3;

//     // 점수 계산
//     let score = 100 * (1 - delta / maxDelta);

//     // 점수가 0보다 작으면 0으로 설정
//     if (score < 0) {
//         score = 0;
//     }

//     return score;
// };

export const ratio111Score = (x: number, y: number, z: number) => {
    // x 이마
    // y 중안부
    // z 턱
    const sumXYZ = x + y + z;

    if (Math.abs(sumXYZ - 100) > 1e-6) {
        // 합계가 100이 아닌 경우, 100%가 되도록 재조정
        x = (x / sumXYZ) * 100;
        y = (y / sumXYZ) * 100;
        z = (z / sumXYZ) * 100;
    }

    const ideal = 100 / 3;

    // 각 부분의 편차 계산
    const delta = Math.abs(x - ideal) + Math.abs(y - ideal) + Math.abs(z - ideal);

    // 최대 차이
    const maxDelta = (100 * (3 - 1)) / 3;

    // 점수 계산 - 지수 함수 사용으로 편차 강조
    // 지수가 클수록 편차가 커짐 (2.5 사용)
    let score = 100 * Math.pow(1 - delta / maxDelta, 2.5);

    // 점수가 0보다 작으면 0으로 설정
    if (score < 0) {
        score = 0;
    }

    return score;
};
