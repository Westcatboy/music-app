export function delta(create_time) {
    let now = new Date();
    let created = new Date(create_time);
    let diff = Math.abs(now - created);
    let diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    // 如果是今天，不返回日期
    if (diffDays === 0) {
        return "Today";
    }
    let diffMonths = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());

    // 如果差异小于30天，返回天数
    if (diffDays < 30) {
        return `${diffDays} days ago`;
    }

    // 如果差异小于365天，返回月份数
    if (diffMonths < 12) {
        return `${diffMonths} months ago`;
    }

    // 否则返回年份数
    let diffYears = now.getFullYear() - created.getFullYear();
    return `${diffYears} years ago`;
}