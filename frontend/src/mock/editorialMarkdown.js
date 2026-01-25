export const editorialMarkdown = `# Two Sum Solution

## 💡 Intuition
We want to find two numbers such that they sum to target.

## 🧠 Approach
Use a hashmap to store visited numbers.

- Traverse the array
- Check if target - current exists
- If yes → solution found

## ⏱ Complexity
- **Time**: O(n)
- **Space**: O(n)

\`\`\`cpp
unordered_map<int,int> mp;
for(int i=0;i<n;i++){
  if(mp.count(target-nums[i])) return {i, mp[target-nums[i]]};
  mp[nums[i]] = i;
}
\`\`\`
`;
