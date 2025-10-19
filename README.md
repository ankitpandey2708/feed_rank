[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ankitpandey2708/feed_rank)

# Feed Rank: Wilson Score Interval Learning Game

An interactive educational game that teaches you how ranking algorithms work by challenging you to rank posts better than raw percentage-based sorting. Learn why statistical confidence matters more than simple approval rates.

## 🎯 What You'll Learn

This game demonstrates why the **Wilson Score Interval** algorithm is superior to naive percentage-based ranking for user-generated content. Through hands-on examples, you'll discover:

- Why an 89% approval rating with 200 votes beats a 95% rating with 20 votes
- How small sample sizes make perfect scores unreliable
- Why bigger sample sizes provide more reliable rankings
- How statistical confidence intervals improve content ranking

## 🎮 How to Play

1. **Read the Challenge**: Each round presents up to 3 posts with their upvotes and downvotes
2. **Think Like a Ranking Algorithm**: Consider both approval percentages AND sample sizes
3. **Drag to Rank**: Arrange posts from highest-ranked (top) to lowest-ranked (bottom)
4. **Submit Your Ranking**: See how well you did compared to the Wilson Score algorithm
5. **Learn from Results**: Study the key insight explaining why the correct ranking works

## 🧠 The Wilson Score Difference

Traditional ranking uses simple percentages:
```
19/20 = 95% 👍 (but only 20 votes!) vs 178/200 = 89% 👍 (200 votes!)
```

Wilson Score considers **statistical confidence**:
```
95% with 20 votes = uncertainty 🤔
89% with 200 votes = very confident 📈
```

Higher sample sizes reduce uncertainty, making rankings more reliable.

## 📋 Features

- **Interactive Learning**: Drag-and-drop interface with immediate feedback
- **Curated Examples**: Real-world scenarios that illustrate ranking algorithm concepts
- **Score Tracking**: See how your intuition compares to mathematical algorithms
- **Educational Insights**: Each example includes specific lessons about ranking
- **Responsive Design**: Works on desktop and mobile devices
- **Accessible**: Keyboard navigation and screen reader support


## 📖 How Wilson Score Works

The Wilson Score interval calculates a confidence interval for a Bernoulli parameter (like approval ratings). The score represents the lower bound of this interval, which accounts for:

1. **Sample Size**: More votes = higher confidence
2. **Approval Rate**: Higher percentage = higher score
3. **Uncertainty**: Small samples get penalized for statistical uncertainty

### Mathematical Formula
```
Wilson Score = (p̂ + z²/(2n) - z√(p̂(1-p̂)/n + z²/(4n²))) / (1 + z²/n)
```

Where:
- `p̂` = upvotes/(upvotes+downvotes)
- `n` = total votes
- `z` = 1.96 (for 95% confidence interval)

## 📚 Learn More

- [Original Wilson Score Paper](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html)
- [Reddit's Ranking Algorithm](https://redditblog.com/2009/10/15/reddits-new-comment-ranking-system/)
- [Understanding Confidence Intervals](https://en.wikipedia.org/wiki/Confidence_interval)

---

**Challenge your intuition. Master ranking algorithms. Build better feeds.** ✨
