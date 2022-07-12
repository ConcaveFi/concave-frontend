export const RouterAbi = [
  'constructor(address _factory, address _implementation, address _WETH)',
  'function WETH() view returns (address)',
  'function factory() view returns (address)',
  'function implementation() view returns (address)',
  'function quote(uint256 amountA, uint256 reserveA, uint256 reserveB) pure returns (uint256 amountB)',

  'function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) pure returns (uint256 amountIn)',
  'function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) pure returns (uint256 amountOut)',
  'function getAmountsIn(uint256 amountOut, address[] path) view returns (uint256[] amounts)',
  'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',

  'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity)',
  'function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity)',

  'function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB)',
  'function removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) returns (uint256 amountToken, uint256 amountETH)',
  'function removeLiquidityETHSupportingFeeOnTransferTokens(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) returns (uint256 amountETH)',
  'function removeLiquidityETHWithPermit(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) returns (uint256 amountToken, uint256 amountETH)',
  'function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) returns (uint256 amountETH)',
  'function removeLiquidityWithPermit(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) returns (uint256 amountA, uint256 amountB)',

  'function swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline) payable returns (uint256[] amounts)',
  'function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable returns (uint256[] amounts)',
  'function swapExactETHForTokensSupportingFeeOnTransferTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable',

  'function swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
  'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
  'function swapExactTokensForETHUsingPermit(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',
  'function swapExactTokensForETHUsingPermitAllowed(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline, uint256 nonce, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',

  'function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
  'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
  'function swapExactTokensForTokensUsingPermit(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',
  'function swapExactTokensForTokensUsingPermitAllowed(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline, uint256 nonce, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',

  'function swapTokensForExactETH(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
  'function swapTokensForExactETHUsingPermit(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',
  'function swapTokensForExactETHUsingPermitAllowed(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline, uint256 nonce, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',

  'function swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline) returns (uint256[] amounts)',
  'function swapTokensForExactTokensUsingPermit(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',
  'function swapTokensForExactTokensUsingPermitAllowed(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline, uint256 nonce, uint8 v, bytes32 r, bytes32 s) returns (uint256[] amounts)',
]
