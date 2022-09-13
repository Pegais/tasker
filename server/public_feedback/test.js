const { log } = require("console");

function kangaroo(x1, v1, x2, v2) {
    // Write your code here
    // check if both x1,vi or x2 ,v2 is greater than other each other
    // if both x1 and v1 are greater , than it will never llow other kangaroo to catch up, one othe two values must be less ;
    let k1_start_point = x1;
    let k2_start_point = x2;
    let k1_rate_jumps = v1;
    let k2_rate_jumps = v2;

    // checking if kangaroo_1's start point is greater than kangaroo_2's start point and its rate of jumps is greater than kangaroo_2's
    // in this scenario knagaroo_2 can never catch up to kangaroo_1
    // and the same is true vice versa;
    if (k1_start_point > k2_start_point && k1_rate_jumps > k2_rate_jumps) {
        return "NO";
    } else if (k2_start_point > k1_start_point && k2_rate_jumps > k1_rate_jumps) { 
        return "NO";
    } else {
        let distance_by_k1 = k1_start_point;
        let distance_by_k2 = k2_start_point;
        let total_distance_allowed = 0;
        let flag = true;
        while (flag) {
            console.log("total distance: " + total_distance_allowed);
            console.log("distance travelled by kangaroo_1 : "+ distance_by_k1);
            console.log("distance travelled by kangaroo_2 : "+ distance_by_k2);
            if (distance_by_k1 == distance_by_k2) {
                return "YES";
                break;
            } else if (total_distance_allowed > 10000) {
                return "NO";
                break;
            }
            distance_by_k2 = distance_by_k2 + k2_rate_jumps;
            distance_by_k1 = distance_by_k1 + k1_rate_jumps
            total_distance_allowed++;
        }
    }
}

console.log(kangaroo(0, 3,4,2));
